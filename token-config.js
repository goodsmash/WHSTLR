module.exports = {
    // Token Details
    TOKEN_NAME: "WHSTLR",
    TOKEN_SYMBOL: "WHST",
    TOTAL_SUPPLY: "1000000000", // 1 billion tokens
    DECIMALS: 9, // Standard for Solana tokens

    // Distribution
    DISTRIBUTION: {
        COMMUNITY_REWARDS: 0.4,    // 40% - Community rewards and airdrops
        DEVELOPMENT: 0.2,          // 20% - Development fund
        MARKETING: 0.15,           // 15% - Marketing and partnerships
        LIQUIDITY: 0.15,           // 15% - Liquidity pool
        RESERVE: 0.1               // 10% - Reserve fund
    },

    // Token Features
    FEATURES: {
        BURNABLE: true,           // Can tokens be burned
        MINTABLE: false,          // No additional minting after initial supply
        PAUSABLE: true            // Can transfers be paused in emergencies
    },

    // Network Configuration (change based on environment)
    NETWORK: {
        DEVNET: "https://api.devnet.solana.com",
        MAINNET: "https://api.mainnet-beta.solana.com"
    }
};
