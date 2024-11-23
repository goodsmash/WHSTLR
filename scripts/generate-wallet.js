const { Keypair } = require('@solana/web3.js');
const fs = require('fs');
const path = require('path');

// Create wallet directory if it doesn't exist
const walletDir = path.join(__dirname, '..', 'wallet');
if (!fs.existsSync(walletDir)) {
    fs.mkdirSync(walletDir, { recursive: true });
}

// Generate new keypair
const keypair = Keypair.generate();

// Convert to JSON format
const walletData = {
    publicKey: keypair.publicKey.toString(),
    secretKey: Array.from(keypair.secretKey)
};

// Save to file
const walletPath = path.join(walletDir, 'deploy-wallet.json');
fs.writeFileSync(walletPath, JSON.stringify(walletData, null, 2));

console.log('New wallet generated!');
console.log('Public Key:', walletData.publicKey);
console.log('Wallet saved to:', walletPath);
console.log('\nIMPORTANT: Keep your wallet file safe and never share it!');
