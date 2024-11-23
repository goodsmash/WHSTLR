const { Connection, PublicKey, LAMPORTS_PER_SOL } = require('@solana/web3.js');
const fs = require('fs');
const path = require('path');

async function requestAirdrop() {
    try {
        // Load wallet
        const walletPath = path.join(__dirname, '..', 'wallet', 'deploy-wallet.json');
        const walletData = JSON.parse(fs.readFileSync(walletPath, 'utf-8'));
        const publicKey = new PublicKey(walletData.publicKey);

        // Connect to devnet
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

        console.log('Requesting airdrop of 2 SOL...');
        const signature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL);
        await connection.confirmTransaction(signature);

        // Check balance
        const balance = await connection.getBalance(publicKey);
        console.log(`Airdrop successful! New balance: ${balance / LAMPORTS_PER_SOL} SOL`);

    } catch (error) {
        console.error('Error requesting airdrop:', error);
    }
}

requestAirdrop();
