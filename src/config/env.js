// Environment configuration
const env = {
  // API endpoints
  apiEndpoint: process.env.NODE_ENV === 'production' 
    ? 'https://api.whistleblower.dev' // Replace with your production API domain
    : 'http://localhost:3001',
    
  // Feature flags
  features: {
    memeGeneration: true,
    twitterSharing: true,
    communityFeatures: false
  },

  // Meme generation settings
  memeGen: {
    maxPromptLength: 200,
    defaultProvider: 'dalle',
    fallbackEnabled: true,
    cacheEnabled: true
  }
};

export default env;
