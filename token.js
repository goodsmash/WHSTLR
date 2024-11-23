const { 
    Connection, 
    PublicKey, 
    Keypair, 
    SystemProgram,
    Transaction,
    sendAndConfirmTransaction
} = require('@solana/web3.js');
const { 
    Token, 
    TOKEN_PROGRAM_ID, 
    ASSOCIATED_TOKEN_PROGRAM_ID 
} = require('@solana/spl-token');
const config = require('./token-config');

class WHSTLRToken {
    constructor(connection, payer) {
        this.connection = connection;
        this.payer = payer;
    }

    async createToken() {
        // Create mint account
        const mintAccount = Keypair.generate();
        
        const tokenAcc = await Token.createMint(
            this.connection,
            this.payer,
            this.payer.publicKey,
            this.payer.publicKey,
            config.DECIMALS,
            TOKEN_PROGRAM_ID
        );

        console.log('Token created:', tokenAcc.publicKey.toString());

        // Mint initial supply
        const initialSupplyLamports = config.TOTAL_SUPPLY * Math.pow(10, config.DECIMALS);
        
        // Create token account for payer
        const tokenAccount = await tokenAcc.createAccount(this.payer.publicKey);
        
        // Mint tokens to payer account
        await tokenAcc.mintTo(
            tokenAccount,
            this.payer,
            [],
            initialSupplyLamports
        );

        console.log('Initial supply minted to:', tokenAccount.toString());

        return {
            tokenMint: tokenAcc.publicKey,
            tokenAccount: tokenAccount
        };
    }

    async distributeTokens(tokenMint, distributions) {
        const token = new Token(
            this.connection,
            tokenMint,
            TOKEN_PROGRAM_ID,
            this.payer
        );

        for (const [address, amount] of Object.entries(distributions)) {
            const destinationAccount = await token.createAccount(new PublicKey(address));
            await token.transfer(
                this.payer.publicKey,
                destinationAccount,
                this.payer,
                [],
                amount * Math.pow(10, config.DECIMALS)
            );
            console.log(`Distributed ${amount} tokens to ${address}`);
        }
    }
}

module.exports = WHSTLRToken;
