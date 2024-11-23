const { Connection, Keypair, PublicKey } = require('@solana/web3.js');
const WHSTLRToken = require('./token');
const config = require('./token-config');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        // Load deployment wallet
        const walletPath = path.join(__dirname, 'wallet', 'deploy-wallet.json');
        const walletData = JSON.parse(fs.readFileSync(walletPath, 'utf-8'));
        const payer = Keypair.fromSecretKey(new Uint8Array(walletData.secretKey));

        // Connect to devnet for testing
        const connection = new Connection(config.NETWORK.DEVNET, 'confirmed');
        
        // Check wallet balance
        const balance = await connection.getBalance(payer.publicKey);
        console.log(`Wallet balance: ${balance / 1e9} SOL`);

        if (balance < 1e9) {
            throw new Error('Insufficient SOL balance. Please run scripts/request-sol.js first.');
        }
        
        console.log('Deploying WHSTLR token...');
        const whstlr = new WHSTLRToken(connection, payer);
        
        // Create token
        const { tokenMint, tokenAccount } = await whstlr.createToken();
        
        console.log('Token deployed successfully!');
        console.log('Token Mint Address:', tokenMint.toString());
        console.log('Token Account:', tokenAccount.toString());

        // Save token info
        const tokenInfo = {
            mint: tokenMint.toString(),
            deploymentDate: new Date().toISOString(),
            network: 'devnet'
        };
        fs.writeFileSync(
            path.join(__dirname, 'token-info.json'),
            JSON.stringify(tokenInfo, null, 2)
        );
        
        // Distribution wallets (replace with your actual wallets)
        const distributions = {
            [new PublicKey('YOUR_COMMUNITY_WALLET').toString()]: 
                config.TOTAL_SUPPLY * config.DISTRIBUTION.COMMUNITY_REWARDS,
            [new PublicKey('YOUR_DEV_WALLET').toString()]: 
                config.TOTAL_SUPPLY * config.DISTRIBUTION.DEVELOPMENT,
            [new PublicKey('YOUR_MARKETING_WALLET').toString()]: 
                config.TOTAL_SUPPLY * config.DISTRIBUTION.MARKETING,
            [new PublicKey('YOUR_LIQUIDITY_WALLET').toString()]: 
                config.TOTAL_SUPPLY * config.DISTRIBUTION.LIQUIDITY,
            [new PublicKey('YOUR_RESERVE_WALLET').toString()]: 
                config.TOTAL_SUPPLY * config.DISTRIBUTION.RESERVE
        };
        
        console.log('Starting token distribution...');
        await whstlr.distributeTokens(tokenMint, distributions);
        console.log('Initial token distribution completed!');
        
    } catch (error) {
        console.error('Deployment failed:', error);
        process.exit(1);
    }
}

main();
