const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const OpenAI = require('openai');
require('dotenv').config();

// Initialize Express app
const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes middleware - must come before static files
app.use('/api', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://whistleblower.dev', 'https://www.whistleblower.dev']
    : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Security middleware with proper CSP and cache settings
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:3003", "https://api.openai.com"],
      imgSrc: ["'self'", "data:", "https:", "http:", "https://*.openai.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      frameAncestors: ["'none'"],
      formAction: ["'self'"],
      upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
  referrerPolicy: { policy: "strict-origin-when-cross-origin" }
}));

// Remove unnecessary headers
app.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  res.removeHeader('X-XSS-Protection');
  res.removeHeader('X-Frame-Options');
  next();
});

// Cache control middleware
app.use((req, res, next) => {
  // Static assets
  if (req.url.match(/\.(css|js|jpg|jpeg|png|gif|ico|woff|woff2|ttf|eot)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
  } else {
    // Dynamic content
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  }
  next();
});

// Additional security middleware
app.use(xss());
app.use(mongoSanitize());
app.use(hpp());
app.use(cookieParser());

// Initialize OpenAI with debug logging
console.log('Initializing OpenAI with API key:', process.env.OPENAI_API_KEY ? 'Present' : 'Missing');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://api.openai.com/v1'
});

// Test OpenAI connection on startup
async function testOpenAI() {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: "A simple test image of a blue circle",
      n: 1,
      size: "1024x1024",
      quality: "standard",
      response_format: "url"
    });
    console.log('OpenAI test successful:', response.data[0].url ? 'Image URL received' : 'No image URL');
  } catch (error) {
    console.error('OpenAI test failed:', error.message);
  }
}

testOpenAI();

// Meme generation stats
const memeStats = {
  totalGenerated: 0,
  memesRemaining: 100,
  maxPerUser: 5,
  userLimits: new Map(),
  successfulGenerations: 0,
  failedGenerations: 0,
  generationTimes: [],
  lastReset: new Date(),
};

// Reset user limits every hour
setInterval(() => {
  memeStats.userLimits.clear();
  memeStats.lastReset = new Date();
  memeStats.memesRemaining = 100;
}, 3600000);

// Token-specific themes and elements
const tokenThemes = {
  whistleblower: [
    'token chart analysis',
    'blockchain transparency',
    'smart contract audit',
    'token metrics',
    'trading volume spikes',
    'wallet tracking',
    'transaction monitoring',
    'token distribution',
    'liquidity analysis',
    'market manipulation'
  ],
  emotions: [
    'shocked discovery',
    'dramatic reveal',
    'investigative triumph',
    'market panic',
    'community reaction',
    'trader anxiety',
    'whale alert',
    'rugpull awareness',
    'scam prevention',
    'trust verification'
  ]
};

// Style-specific prompt enhancements
const stylePrompts = {
  expose: (prompt) => {
    const theme = tokenThemes.whistleblower[Math.floor(Math.random() * tokenThemes.whistleblower.length)];
    return `Create a dramatic crypto-focused meme template (without text) about ${prompt}. Style: Cyberpunk meets Wall Street. Include ${theme} visualization. Use intense neon lighting, blockchain-inspired patterns, and crypto trading elements. Make it feel like a high-stakes financial revelation. NO TEXT OR WORDS IN THE IMAGE.`;
  },
  
  pepe: (prompt) => {
    const emotion = tokenThemes.emotions[Math.floor(Math.random() * tokenThemes.emotions.length)];
    return `Create a Pepe the Frog crypto reaction meme template (without text) about ${prompt}. Show Pepe in a ${emotion} scenario. Include crypto trading screens, token charts, or blockchain elements in Pepe's environment. Use the classic Pepe art style with crypto-themed accessories. NO TEXT IN THE IMAGE.`;
  },
  
  wojak: (prompt) => {
    const theme = tokenThemes.whistleblower[Math.floor(Math.random() * tokenThemes.whistleblower.length)];
    const emotion = tokenThemes.emotions[Math.floor(Math.random() * tokenThemes.emotions.length)];
    return `Create a Wojak-style crypto reaction template (without text) about ${prompt}. Show Wojak experiencing ${emotion} while dealing with ${theme}. Include crypto trading setup and blockchain elements. Focus on the raw emotional impact typical of Wojak memes. NO TEXT IN THE IMAGE.`;
  },
  
  flux: (prompt) => {
    const theme = tokenThemes.whistleblower[Math.floor(Math.random() * tokenThemes.whistleblower.length)];
    return `Create a futuristic flux-style crypto meme template (without text) about ${prompt}. Use fluid, dynamic energy effects and ${theme}. Style: Combine holographic displays, flowing data streams, and market analysis visuals. Make it feel like a high-tech financial revelation. NO TEXT IN THE IMAGE.`;
  },
  
  classic: (prompt) => {
    const emotion = tokenThemes.emotions[Math.floor(Math.random() * tokenThemes.emotions.length)];
    return `Create a classic crypto reaction meme template (without text) about ${prompt}. Focus on ${emotion} in a crypto trading context. Include blockchain visualization, trading screens, or token charts. Make it instantly recognizable as a crypto meme format. NO TEXT IN THE IMAGE.`;
  }
};

// Helper function to sanitize and enhance prompts
function enhancePrompt(prompt, style) {
  // Basic prompt sanitization
  const sanitizedPrompt = prompt
    .replace(/[^\w\s!?.,]/g, '')
    .trim();

  // Get style-specific enhancement
  const styleEnhancer = stylePrompts[style] || stylePrompts.classic;
  const enhancedPrompt = styleEnhancer(sanitizedPrompt);

  // Add WHSTLR-specific context
  return `${enhancedPrompt}

  WHSTLR-SPECIFIC GUIDELINES:
  1. NO text, words, or numbers in the image
  2. Include crypto/blockchain visual elements:
     - Token price charts
     - Trading interfaces
     - Blockchain networks
     - Wallet interactions
     - Smart contract visualizations
  3. Focus on whistleblower/investigative themes:
     - Discovery moments
     - Revelation scenes
     - Analysis scenarios
     - Community alerts
     - Market monitoring
  4. Maintain these visual qualities:
     - High contrast for meme clarity
     - Dramatic lighting for impact
     - Clean composition for text overlay
     - Crypto-specific iconography
     - Blockchain-inspired patterns
  5. Emotional resonance:
     - Clear facial expressions
     - Relatable trading scenarios
     - Market emotion indicators
     - Community reaction moments
     - Trust/verification symbols

  The final image should be a perfect crypto meme template that works without any embedded text and focuses specifically on token/blockchain themes.`;
}

// OpenAI image generation settings
const imageSettings = {
  model: "dall-e-3",
  n: 1,
  quality: "standard",
  response_format: "url"
};

// Suggested prompts for different styles
const suggestedPrompts = {
  expose: [
    "Token smart contract investigation",
    "Blockchain transaction analysis",
    "Market manipulation detection",
    "Liquidity pool monitoring",
    "Whale wallet tracking"
  ],
  pepe: [
    "Pepe discovers suspicious token activity",
    "Trading chart analysis reaction",
    "Smart contract audit findings",
    "Whale wallet movement alert",
    "Market manipulation evidence"
  ],
  wojak: [
    "First time token investigator",
    "Chart pattern recognition moment",
    "Suspicious transaction discovery",
    "Community alert reaction",
    "Market analysis revelation"
  ],
  flux: [
    "Real-time blockchain monitoring",
    "Token flow visualization",
    "Network activity analysis",
    "Trading pattern detection",
    "Smart contract interaction"
  ],
  classic: [
    "Traditional vs blockchain investigation",
    "Old school meets crypto analysis",
    "Vintage trading room scene",
    "Classic detective meets blockchain",
    "Retro computer crypto research"
  ]
};

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', environment: process.env.NODE_ENV });
});

app.get('/api/stats', (req, res) => {
  const clientIP = req.ip;
  const userTotal = memeStats.userLimits.get(clientIP) || 0;
  
  const recentTimes = memeStats.generationTimes.slice(-100);
  const avgTime = recentTimes.length > 0 
    ? (recentTimes.reduce((a, b) => a + b, 0) / recentTimes.length / 1000).toFixed(1)
    : null;

  const totalAttempts = memeStats.successfulGenerations + memeStats.failedGenerations;
  const successRate = totalAttempts > 0 
    ? ((memeStats.successfulGenerations / totalAttempts) * 100).toFixed(1)
    : null;

  res.json({
    totalGenerated: memeStats.totalGenerated,
    totalLimit: memeStats.totalLimit,
    memesRemaining: memeStats.memesRemaining,
    userTotal,
    maxPerUser: memeStats.maxPerUser,
    avgGenerationTime: avgTime ? `${avgTime}s` : null,
    successRate: successRate ? `${successRate}%` : null,
    lastReset: memeStats.lastReset
  });
});

app.post('/api/generate-meme', async (req, res) => {
  const clientIP = req.ip;
  const startTime = Date.now();
  const { prompt, style } = req.body;

  try {
    console.log('Received request:', { prompt, style });

    // Input validation
    if (!prompt) {
      throw new Error('Prompt is required');
    }

    if (!style || !suggestedPrompts[style]) {
      throw new Error('Invalid style selected');
    }

    // Rate limiting checks
    if (memeStats.memesRemaining <= 0) {
      throw new Error('Daily meme limit reached. Please try again tomorrow!');
    }

    const userTotal = memeStats.userLimits.get(clientIP) || 0;
    if (userTotal >= memeStats.maxPerUser) {
      throw new Error(`You've reached your limit of ${memeStats.maxPerUser} memes per hour. Please try again later!`);
    }

    // Check OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    // Enhance the prompt with our fine-tuned instructions
    const enhancedPrompt = enhancePrompt(prompt, style);
    console.log('Enhanced prompt:', enhancedPrompt);

    // Generate image with OpenAI using our optimized settings
    console.log('Calling OpenAI API...');
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: enhancedPrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      response_format: "url"
    });

    console.log('OpenAI API response:', JSON.stringify(response, null, 2));

    if (!response.data || !response.data[0] || !response.data[0].url) {
      throw new Error('Invalid response from OpenAI API');
    }

    const imageUrl = response.data[0].url;

    // Update statistics
    memeStats.totalGenerated++;
    memeStats.memesRemaining--;
    memeStats.successfulGenerations++;
    memeStats.generationTimes.push(Date.now() - startTime);
    memeStats.userLimits.set(clientIP, userTotal + 1);

    // Return success response
    res.json({
      success: true,
      imageUrl,
      memesRemaining: memeStats.memesRemaining,
      userTotal: userTotal + 1,
      maxPerUser: memeStats.maxPerUser,
      generationTime: `${((Date.now() - startTime) / 1000).toFixed(1)}s`
    });

  } catch (error) {
    console.error('Error generating meme:', error);
    
    // Update error statistics
    memeStats.failedGenerations++;
    memeStats.generationTimes.push(Date.now() - startTime);

    // Return error response
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate meme',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
} else {
  // In development, only serve API routes
  app.get('/', (req, res) => {
    res.json({ message: 'WHSTLR API Server' });
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method
  });
  
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
    path: req.path
  });
});

// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please try the following:
    1. Stop any other servers running on port ${PORT}
    2. Or change the PORT in .env file
    3. Or run with a different port: PORT=3002 npm run server`);
  } else {
    console.error('Server error:', err);
  }
  process.exit(1);
});
