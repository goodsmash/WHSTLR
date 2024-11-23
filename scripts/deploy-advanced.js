const { Connection, Keypair, PublicKey } = require('@solana/web3.js');
const WHSTLRToken = require('../contracts/WHSTLRToken');
const config = require('../contracts/config');
const fs = require('fs');
const path = require('path');

async function deployToken() {
    try {
        // Load deployment wallet
        const walletPath = path.join(__dirname, '..', 'wallet', 'deploy-wallet.json');
        const walletData = JSON.parse(fs.readFileSync(walletPath, 'utf-8'));
        const payer = Keypair.fromSecretKey(new Uint8Array(walletData.secretKey));

        // Connect to network
        const connection = new Connection(config.NETWORK.DEVNET, 'confirmed');
        
        // Check wallet balance
        const balance = await connection.getBalance(payer.publicKey);
        console.log(`Deployment wallet balance: ${balance / 1e9} SOL`);

        if (balance < 1e9) {
            throw new Error('Insufficient SOL balance. Please run request-sol.js first.');
        }

        // Initialize token
        console.log('Initializing WHSTLR token...');
        const whstlr = new WHSTLRToken(connection, payer);
        const token = await whstlr.initialize(config);

        // Create necessary accounts
        console.log('Creating token infrastructure...');
        
        // Create treasury account
        const treasury = await token.createAccount(payer.publicKey);
        config.ADDRESSES.TREASURY = treasury.toString();

        // Create staking pool
        console.log('Setting up staking pool...');
        const stakingPool = await whstlr.createStakingPool();
        config.ADDRESSES.STAKING_POOL = stakingPool.toString();

        // Set up vesting schedules
        console.log('Creating vesting schedules...');
        const vestingSchedules = {
            TEAM: await createTeamVesting(whstlr),
            ADVISORS: await createAdvisorsVesting(whstlr),
            PRIVATE_SALE: await createPrivateSaleVesting(whstlr)
        };

        // Initial token distribution
        console.log('Performing initial token distribution...');
        await performInitialDistribution(whstlr, {
            treasury,
            stakingPool,
            vestingSchedules
        });

        // Save deployment information
        const deploymentInfo = {
            network: 'devnet',
            deploymentDate: new Date().toISOString(),
            addresses: {
                token: token.publicKey.toString(),
                treasury: treasury.toString(),
                stakingPool: stakingPool.toString(),
                vestingSchedules
            },
            config: {
                ...config,
                ADDRESSES: {
                    TOKEN_MINT: token.publicKey.toString(),
                    TREASURY: treasury.toString(),
                    STAKING_POOL: stakingPool.toString()
                }
            }
        };

        // Save deployment info
        fs.writeFileSync(
            path.join(__dirname, '..', 'deployment-info.json'),
            JSON.stringify(deploymentInfo, null, 2)
        );

        console.log('Deployment completed successfully!');
        console.log('Deployment info saved to deployment-info.json');
        
        return deploymentInfo;

    } catch (error) {
        console.error('Deployment failed:', error);
        process.exit(1);
    }
}

async function createTeamVesting(whstlr) {
    const schedule = config.VESTING_SCHEDULES.TEAM;
    const amount = config.TOTAL_SUPPLY * config.DISTRIBUTION.DEVELOPMENT;
    return await whstlr.createVestingSchedule(
        whstlr.payer.publicKey,
        amount,
        schedule.VESTING_MONTHS * 30 * 24 * 60 * 60 * 1000 // Convert months to milliseconds
    );
}

async function createAdvisorsVesting(whstlr) {
    const schedule = config.VESTING_SCHEDULES.ADVISORS;
    const amount = config.TOTAL_SUPPLY * 0.05; // 5% for advisors
    return await whstlr.createVestingSchedule(
        whstlr.payer.publicKey,
        amount,
        schedule.VESTING_MONTHS * 30 * 24 * 60 * 60 * 1000
    );
}

async function createPrivateSaleVesting(whstlr) {
    const schedule = config.VESTING_SCHEDULES.PRIVATE_SALE;
    const amount = config.TOTAL_SUPPLY * 0.1; // 10% for private sale
    return await whstlr.createVestingSchedule(
        whstlr.payer.publicKey,
        amount,
        schedule.VESTING_MONTHS * 30 * 24 * 60 * 60 * 1000
    );
}

async function performInitialDistribution(whstlr, accounts) {
    const distributions = [
        {
            account: accounts.treasury,
            amount: config.TOTAL_SUPPLY * config.DISTRIBUTION.RESERVE,
            description: 'Reserve Fund'
        },
        {
            account: accounts.stakingPool,
            amount: config.STAKING_REWARDS_SUPPLY,
            description: 'Staking Rewards Pool'
        }
    ];

    for (const dist of distributions) {
        console.log(`Distributing ${dist.amount} tokens to ${dist.description}...`);
        await whstlr.transfer(
            whstlr.payer.publicKey,
            dist.account,
            dist.amount
        );
    }
}

// Run deployment
if (require.main === module) {
    deployToken()
        .then(() => process.exit(0))
        .catch(error => {
            console.error(error);
            process.exit(1);
        });
}
