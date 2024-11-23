# WHSTLR - Blockchain Meme Generator

WHSTLR is an AI-powered platform that generates creative memes focused on blockchain transparency and crypto corruption exposure.

## Features

- AI-powered meme generation using DALL-E 3
- Multiple visual styles (Expose, Pepe, Wojak, Flux, Classic)
- Blockchain-themed visual storytelling
- Modern, glassmorphic UI design
- Rate limiting and user tracking

## Setup

1. Clone the repository:
```bash
git clone https://github.com/goodsmash/WHSTLR.git
cd WHSTLR
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
- Copy `.env.example` to `.env`
- Update the values in `.env` with your configuration
- Get your OpenAI API key from https://platform.openai.com/api-keys

4. Start the development server:
```bash
# Start the backend (Port 3002)
npm run server

# In a new terminal, start the frontend (Port 3004)
npm start
```

## Environment Variables

- `PORT`: Backend server port (default: 3002)
- `NODE_ENV`: Environment mode (development/production)
- `REACT_APP_API_URL`: Backend API URL
- `OPENAI_API_KEY`: Your OpenAI API key

## Tech Stack

- Frontend: React, Material-UI
- Backend: Express.js
- AI Generation: OpenAI DALL-E 3
- State Management: Local component state

## Security

- Content Security Policy implemented
- CORS configured
- Rate limiting on meme generation
- Prompt sanitization
- IP-based user tracking

## License

MIT License
