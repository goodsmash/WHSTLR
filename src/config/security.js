// Security configuration for the frontend
export const securityConfig = {
  // CSP directives
  contentSecurityPolicy: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", 'https://whistleblower.dev'],
    styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
    imgSrc: ["'self'", 'data:', 'https:', 'blob:'],
    connectSrc: ["'self'", 'https://api.openai.com', 'https://api.replicate.com'],
    fontSrc: ["'self'", 'https://fonts.gstatic.com'],
    objectSrc: ["'none'"],
    mediaSrc: ["'self'"],
    frameSrc: ["'none'"]
  },

  // Allowed domains for API calls
  allowedDomains: [
    'whistleblower.dev',
    'api.whistleblower.dev',
    'api.openai.com',
    'api.replicate.com'
  ],

  // Security headers
  securityHeaders: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Referrer-Policy': 'same-origin'
  },

  // Cookie settings
  cookieSettings: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    domain: process.env.NODE_ENV === 'production' ? '.whistleblower.dev' : 'localhost'
  },

  // Rate limiting settings
  rateLimiting: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: process.env.NODE_ENV === 'production' ? 100 : 1000
  },

  // Input validation rules
  validation: {
    maxPromptLength: 200,
    allowedProviders: ['dalle', 'stable-diffusion', 'midjourney'],
    sanitizationRules: {
      removeHtml: true,
      removeScripts: true,
      maxLength: 200
    }
  }
};
