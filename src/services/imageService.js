import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Response Error:', error);
    if (error.response) {
      console.error('Error Data:', error.response.data);
      console.error('Error Status:', error.response.status);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

export const AI_PROVIDERS = {
  DALLE: 'dalle',
  STABLE_DIFFUSION: 'stable-diffusion',
  MIDJOURNEY: 'midjourney'
};

const validatePrompt = (prompt) => {
  if (!prompt || typeof prompt !== 'string') {
    throw new Error('Invalid prompt: Must be a non-empty string');
  }
  if (prompt.length > 1000) {
    throw new Error('Prompt too long: Must be less than 1000 characters');
  }
  const forbiddenTerms = ['hack', 'exploit', 'vulnerability'];
  if (forbiddenTerms.some(term => prompt.toLowerCase().includes(term))) {
    throw new Error('Prompt contains forbidden terms');
  }
  return prompt;
};

export const generateMeme = async (prompt, provider = AI_PROVIDERS.DALLE) => {
  try {
    const validatedPrompt = validatePrompt(prompt);

    const response = await api.post('/api/generate-meme', {
      prompt: validatedPrompt,
      provider
    });

    if (!response.data || !response.data.imageUrl) {
      throw new Error('Invalid response from server');
    }

    return response.data.imageUrl;
  } catch (error) {
    console.error('Failed to generate meme:', error);
    throw error;
  }
};
