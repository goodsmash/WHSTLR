const { 
    Token, 
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID 
} = require('@solana/spl-token');
const { 
    Connection, 
    PublicKey, 
    Keypair, 
    SystemProgram,
    Transaction,
    TransactionInstruction,
    SYSVAR_RENT_PUBKEY,
    SYSVAR_CLOCK_PUBKEY
} = require('@solana/web3.js');
const AntiBot = require('./security/AntiBot');

class WHSTLRToken {
    constructor(connection, payer) {
        this.connection = connection;
        this.payer = payer;
        this.tokenMint = null;
        this.tokenAccount = null;
        this.stakingPool = null;
        this.antiBot = new AntiBot();
        this.maxBuyLimit = 0.005; // 0.5% of total supply
        this.maxSellLimit = 0.003; // 0.3% of total supply
        this.tradingDelay = 300; // 5 minutes
        this.transferCooldown = new Map(); // address -> last transfer time
        this.stakeTimestamps = new Map();
        this.proposals = new Map();
        this.vestingAccounts = new Map();
    }

    // Initialize token with enhanced security
    async initialize(config) {
        this.config = config;
        
        // Create mint account with transfer delay
        const mintAccount = Keypair.generate();
        this.tokenMint = await Token.createMint(
            this.connection,
            this.payer,
            this.payer.publicKey,
            this.payer.publicKey,
            config.DECIMALS,
            TOKEN_PROGRAM_ID
        );

        // Set up anti-bot measures
        await this.antiBot.enableTrading(this.tradingDelay);

        // Create fee collector with reduced dev allocation
        this.feeCollector = await this.tokenMint.createAccount(
            new PublicKey(config.FEE_COLLECTOR)
        );

        // Create staking pool with initial rewards
        this.stakingPool = await this.createStakingPool();

        console.log('Token initialized with security features:', {
            mint: this.tokenMint.publicKey.toString(),
            feeCollector: this.feeCollector.toString(),
            stakingPool: this.stakingPool.toString()
        });

        return this.tokenMint;
    }

    // Enhanced transfer with security checks
    async transfer(from, to, amount) {
        // Anti-bot checks
        await this.antiBot.canTrade(from, amount, await this.connection.getSlot());
        
        // Check transfer limits
        const totalSupply = this.config.TOTAL_SUPPLY;
        const maxBuyAmount = totalSupply * this.maxBuyLimit;
        const maxSellAmount = totalSupply * this.maxSellLimit;

        if (amount > maxBuyAmount) {
            throw new Error(`Buy amount exceeds limit of ${maxBuyAmount} tokens`);
        }
        if (amount > maxSellAmount) {
            throw new Error(`Sell amount exceeds limit of ${maxSellAmount} tokens`);
        }

        // Check transfer cooldown (15 seconds)
        const lastTransfer = this.transferCooldown.get(from.toString()) || 0;
        if (Date.now() - lastTransfer < 15000) {
            throw new Error('Transfer cooldown in effect');
        }

        // Calculate fees with reduced dev allocation
        const fee = Math.floor(amount * this.config.TRANSFER_FEE_PERCENT);
        const burnAmount = Math.floor(fee * 0.4); // 40% of fees burned
        const stakingAmount = Math.floor(fee * 0.4); // 40% to staking
        const devAmount = Math.floor(fee * 0.2); // 20% to dev (reduced)
        const netAmount = amount - fee;

        // Execute transfers
        await this.tokenMint.transfer(
            from,
            to,
            this.payer,
            [],
            netAmount
        );

        // Handle fee distribution
        if (fee > 0) {
            // Burn portion
            await this.burn(from, burnAmount);

            // Staking rewards
            await this.tokenMint.transfer(
                from,
                this.stakingPool,
                this.payer,
                [],
                stakingAmount
            );

            // Dev fee (reduced)
            await this.tokenMint.transfer(
                from,
                this.feeCollector,
                this.payer,
                [],
                devAmount
            );
        }

        // Record transaction for anti-bot
        await this.antiBot.recordTransaction(from, amount);
        this.transferCooldown.set(from.toString(), Date.now());

        return { netAmount, fee, burnAmount, stakingAmount, devAmount };
    }

    // Enhanced staking with security
    async stake(userAccount, amount) {
        // Verify human behavior
        await this.antiBot.verifyHumanBehavior(userAccount);
        
        const userStakeAccount = await this.getOrCreateStakeAccount(userAccount);
        
        // Minimum stake amount (0.1% of total supply)
        const minStake = this.config.TOTAL_SUPPLY * 0.001;
        if (amount < minStake) {
            throw new Error(`Minimum stake amount is ${minStake} tokens`);
        }

        // Transfer tokens to stake account
        await this.transfer(
            userAccount,
            userStakeAccount,
            amount
        );

        // Record stake timestamp
        this.stakeTimestamps.set(userStakeAccount.toString(), Date.now());

        return userStakeAccount;
    }

    // Staking functionality
    async createStakingPool() {
        const stakingPool = await this.tokenMint.createAccount(
            this.payer.publicKey
        );
        
        // Mint initial staking rewards
        await this.tokenMint.mintTo(
            stakingPool,
            this.payer,
            [],
            this.config.STAKING_REWARDS_SUPPLY
        );

        return stakingPool;
    }

    async unstake(userStakeAccount) {
        const stakeTimestamp = this.stakeTimestamps.get(userStakeAccount.toString());
        if (!stakeTimestamp) {
            throw new Error('No stake found for this account');
        }

        // Calculate staking duration and rewards
        const stakingDuration = (Date.now() - stakeTimestamp) / (1000 * 60 * 60 * 24); // days
        const stakedAmount = await this.tokenMint.getAccountInfo(userStakeAccount);
        const rewards = this.calculateStakingRewards(stakedAmount.amount.toNumber(), stakingDuration);

        // Transfer rewards
        if (rewards > 0) {
            await this.tokenMint.transfer(
                this.stakingPool,
                userStakeAccount,
                this.payer,
                [],
                rewards
            );
        }

        return rewards;
    }

    // Vesting schedule implementation
    async createVestingSchedule(beneficiary, amount, vestingDuration) {
        const vestingAccount = await this.tokenMint.createAccount(
            this.payer.publicKey
        );

        this.vestingAccounts.set(vestingAccount.toString(), {
            beneficiary: beneficiary.toString(),
            startTime: Date.now(),
            duration: vestingDuration,
            totalAmount: amount,
            claimed: 0
        });

        // Transfer tokens to vesting account
        await this.tokenMint.transfer(
            this.payer.publicKey,
            vestingAccount,
            this.payer,
            [],
            amount
        );

        return vestingAccount;
    }

    async claimVestedTokens(vestingAccount) {
        const vesting = this.vestingAccounts.get(vestingAccount.toString());
        if (!vesting) {
            throw new Error('No vesting schedule found for this account');
        }

        const elapsedTime = Date.now() - vesting.startTime;
        const vestedAmount = Math.floor(
            (vesting.totalAmount * elapsedTime) / vesting.duration
        );
        const claimableAmount = vestedAmount - vesting.claimed;

        if (claimableAmount > 0) {
            await this.tokenMint.transfer(
                vestingAccount,
                new PublicKey(vesting.beneficiary),
                this.payer,
                [],
                claimableAmount
            );

            vesting.claimed += claimableAmount;
            this.vestingAccounts.set(vestingAccount.toString(), vesting);
        }

        return claimableAmount;
    }

    // Governance functionality
    async createProposal(proposer, description, votingDuration) {
        const proposal = {
            id: Date.now().toString(),
            proposer: proposer.toString(),
            description,
            startTime: Date.now(),
            duration: votingDuration,
            votes: {
                for: 0,
                against: 0
            },
            voters: new Set()
        };

        this.proposals.set(proposal.id, proposal);
        return proposal.id;
    }

    async vote(proposalId, voter, voteWeight, support) {
        const proposal = this.proposals.get(proposalId);
        if (!proposal) {
            throw new Error('Proposal not found');
        }

        if (proposal.voters.has(voter.toString())) {
            throw new Error('Already voted on this proposal');
        }

        if (Date.now() > proposal.startTime + proposal.duration) {
            throw new Error('Voting period has ended');
        }

        if (support) {
            proposal.votes.for += voteWeight;
        } else {
            proposal.votes.against += voteWeight;
        }

        proposal.voters.add(voter.toString());
        this.proposals.set(proposalId, proposal);

        return proposal.votes;
    }

    // Utility functions
    async getOrCreateStakeAccount(owner) {
        try {
            return await this.tokenMint.getOrCreateAssociatedAccountInfo(owner);
        } catch (error) {
            return await this.tokenMint.createAccount(owner);
        }
    }

    calculateStakingRewards(amount, duration) {
        const annualRate = this.config.STAKING_APY;
        return Math.floor(amount * (annualRate / 365) * duration);
    }

    // Enhanced burn mechanism
    async burn(account, amount) {
        await this.tokenMint.burn(
            account,
            this.payer,
            [],
            amount
        );
        
        // Emit burn event
        console.log(`Burned ${amount} tokens from ${account.toString()}`);
    }

    // Emergency functions
    async emergencyPause() {
        this.antiBot.tradingEnabled = false;
        console.log('Trading emergency paused at:', new Date().toISOString());
    }

    async emergencyResume() {
        await this.antiBot.enableTrading(60); // 1 minute delay on resume
    }
}

module.exports = WHSTLRToken;
