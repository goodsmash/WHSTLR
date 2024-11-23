module.exports = {
    // Token Details
    TOKEN_NAME: "WHSTLR",
    TOKEN_SYMBOL: "WHST",
    TOTAL_SUPPLY: "1000000000", // 1 billion tokens
    DECIMALS: 9,

    // Distribution (Updated with reduced dev allocation)
    DISTRIBUTION: {
        COMMUNITY_REWARDS: 0.50,    // 50% - Community rewards and airdrops
        LIQUIDITY: 0.20,           // 20% - Liquidity pool
        MARKETING: 0.15,           // 15% - Marketing and partnerships
        DEVELOPMENT: 0.10,         // 10% - Development fund (reduced)
        RESERVE: 0.05              // 5% - Reserve fund
    },

    // Anti-Bot & Security
    LAUNCH_DELAY: 300,            // 5 minutes delay after launch
    MAX_BUY_PERCENT: 0.005,       // Maximum 0.5% per buy
    MAX_SELL_PERCENT: 0.003,      // Maximum 0.3% per sell
    MAX_WALLET_PERCENT: 0.01,     // Maximum 1% per wallet
    COOLDOWN_SECONDS: 15,         // 15 seconds between transactions
    MAX_TX_PER_BLOCK: 2,          // Maximum transactions per block
    BOT_DETECTION: {
        MIN_BLOCKS_BEFORE_TRADE: 5,
        MAX_TRADES_PER_MINUTE: 3,
        SUSPICIOUS_PATTERN_BLOCKS: 10
    },
    
    // Transaction Fees (Updated distribution)
    TRANSFER_FEE_PERCENT: 0.02,    // 2% transfer fee
    FEE_DISTRIBUTION: {
        BURN: 0.4,                 // 40% of fees are burned
        STAKING_REWARDS: 0.4,      // 40% go to staking rewards
        DEVELOPMENT: 0.2           // 20% go to development (reduced)
    },

    // Staking
    STAKING_APY: 0.15,            // 15% Annual Percentage Yield
    MIN_STAKE_AMOUNT: 0.001,      // Minimum 0.1% of total supply
    MIN_STAKE_DURATION: 7,        // Minimum 7 days staking period
    STAKING_REWARDS_SUPPLY: "100000000", // 100M tokens for staking rewards
    EARLY_UNSTAKE_PENALTY: 0.2,   // 20% penalty for early unstaking

    // Vesting Schedules (Updated with longer periods)
    VESTING_SCHEDULES: {
        TEAM: {
            CLIFF_MONTHS: 12,      // 12 months cliff
            VESTING_MONTHS: 36,    // 36 months total vesting
            RELEASE_FREQUENCY: "MONTHLY"
        },
        ADVISORS: {
            CLIFF_MONTHS: 6,
            VESTING_MONTHS: 24,
            RELEASE_FREQUENCY: "MONTHLY"
        },
        PRIVATE_SALE: {
            CLIFF_MONTHS: 3,
            VESTING_MONTHS: 12,
            RELEASE_FREQUENCY: "MONTHLY"
        }
    },

    // Security Features
    SECURITY: {
        BLACKLIST_ENABLED: true,
        TRANSFER_DELAY_BLOCKS: 5,
        MAX_GAS_PRICE: 100,
        HONEYPOT_DETECTION: true,
        EMERGENCY_PAUSE_ENABLED: true,
        RATE_LIMITING: {
            ENABLED: true,
            MAX_REQUESTS_PER_MINUTE: 30
        },
        PRICE_IMPACT: {
            MAX_BUY_IMPACT: 0.03,  // 3% max price impact for buys
            MAX_SELL_IMPACT: 0.03  // 3% max price impact for sells
        }
    },

    // Network Configuration
    NETWORK: {
        DEVNET: "https://api.devnet.solana.com",
        MAINNET: "https://api.mainnet-beta.solana.com"
    },

    // Contract Addresses (to be filled after deployment)
    ADDRESSES: {
        TOKEN_MINT: null,
        TREASURY: null,
        FEE_COLLECTOR: null,
        STAKING_POOL: null,
        GOVERNANCE: null
    }
};
