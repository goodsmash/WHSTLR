import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  Chip,
  Tooltip,
  CircularProgress,
  Alert,
  Paper,
  Container,
  Stack,
  Divider
} from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import PsychologyIcon from '@mui/icons-material/Psychology';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import TwitterIcon from '@mui/icons-material/Twitter';
import SearchIcon from '@mui/icons-material/Search';
import FaceIcon from '@mui/icons-material/Face';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { styled } from '@mui/material/styles';
import { API_BASE_URL } from '../config/api';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(124, 77, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(124, 77, 255, 0.2)',
  marginBottom: theme.spacing(2),
  overflow: 'hidden'
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: '512px',
  margin: '0 auto',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  '& img': {
    width: '100%',
    height: 'auto',
    display: 'block',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.02)'
    }
  }
}));

const ControlsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  maxWidth: '512px',
  margin: '0 auto'
}));

const StyledChip = styled(Chip)(({ theme, selected }) => ({
  margin: theme.spacing(0.5),
  background: selected ? 'rgba(124, 77, 255, 0.2)' : 'rgba(124, 77, 255, 0.05)',
  '&:hover': {
    background: 'rgba(124, 77, 255, 0.15)',
  },
}));

const PromptSection = styled(Box)(({ theme }) => ({
  background: 'rgba(124, 77, 255, 0.02)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3)
}));

const StyleGrid = styled(Grid)(({ theme }) => ({
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3)
}));

const ThemeCard = styled(Card)(({ theme, selected }) => ({
  background: selected ? 'rgba(124, 77, 255, 0.1)' : 'rgba(124, 77, 255, 0.02)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: selected ? '1px solid rgba(124, 77, 255, 0.5)' : '1px solid rgba(124, 77, 255, 0.1)',
  '&:hover': {
    background: 'rgba(124, 77, 255, 0.15)',
    transform: 'translateY(-2px)'
  }
}));

const GlowContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: 'radial-gradient(circle at 50% 0%, rgba(124, 77, 255, 0.1), transparent 70%)',
    pointerEvents: 'none',
    zIndex: 0
  }
}));

const AnimatedPaper = styled(Paper)(({ theme }) => ({
  position: 'relative',
  background: 'rgba(17, 25, 40, 0.75)',
  backdropFilter: 'blur(16px) saturate(180%)',
  border: '1px solid rgba(124, 77, 255, 0.125)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 32px rgba(124, 77, 255, 0.1)'
  }
}));

const StyledThemeCard = styled(Card)(({ theme, selected }) => ({
  background: selected ? 
    'linear-gradient(135deg, rgba(124, 77, 255, 0.15) 0%, rgba(124, 77, 255, 0.05) 100%)' : 
    'rgba(124, 77, 255, 0.02)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: selected ? 
    '1px solid rgba(124, 77, 255, 0.5)' : 
    '1px solid rgba(124, 77, 255, 0.1)',
  '&:hover': {
    background: 'linear-gradient(135deg, rgba(124, 77, 255, 0.2) 0%, rgba(124, 77, 255, 0.1) 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 32px rgba(124, 77, 255, 0.15)'
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, rgba(124, 77, 255, 0.2) 0%, rgba(124, 77, 255, 0.1) 100%)',
  marginBottom: theme.spacing(1),
  '& svg': {
    fontSize: 24,
    color: '#7c4dff'
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(124, 77, 255, 0.02)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(124, 77, 255, 0.05)'
    },
    '&.Mui-focused': {
      background: 'rgba(124, 77, 255, 0.08)',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(124, 77, 255, 0.5)'
      }
    }
  }
}));

const GenerateButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #7c4dff 30%, #448aff 90%)',
  border: 0,
  borderRadius: theme.spacing(3),
  boxShadow: '0 3px 5px 2px rgba(124, 77, 255, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #6a1bff 30%, #2979ff 90%)',
    boxShadow: '0 4px 10px 2px rgba(124, 77, 255, .4)',
    transform: 'translateY(-1px)'
  },
  '&:disabled': {
    background: 'linear-gradient(45deg, #9e9e9e 30%, #757575 90%)',
    boxShadow: 'none'
  }
}));

const tokenPrompts = [
  "$WHSTLR token breaking free from traditional blockchain constraints",
  "$WHSTLR token illuminating dark corners of blockchain transparency",
  "A glowing $WHSTLR token exposing corrupt practices in the crypto world",
  "$WHSTLR warriors defending blockchain transparency",
  "Digital vault with $WHSTLR tokens radiating truth",
  "$WHSTLR token as a beacon of hope in crypto darkness",
  "Corrupt tokens being exposed by $WHSTLR's light",
  "$WHSTLR breaking chains of crypto corruption",
  "Wall Street suits running from $WHSTLR revelations",
  "$WHSTLR token leading a revolution in blockchain transparency"
];

const visualThemes = {
  expose: [
    "Cyberpunk cityscape with $WHSTLR holograms exposing corruption",
    "Digital courtroom with $WHSTLR as the judge",
    "$WHSTLR token shattering corrupt blockchain networks",
    "Blockchain explorer screen showing $WHSTLR tracking suspicious transactions",
    "Futuristic audit room with $WHSTLR holographic displays"
  ],
  pepe: [
    "Detective Pepe following $WHSTLR token trails",
    "Pepe wielding $WHSTLR token like a magnifying glass",
    "Pepe celebrating $WHSTLR victory over corruption",
    "Pepe in cyber-armor with $WHSTLR shield",
    "Pepe exposing corrupt tokens with $WHSTLR light"
  ],
  wojak: [
    "Corrupt trader wojak panicking at $WHSTLR revelations",
    "Wojak discovering $WHSTLR's power of transparency",
    "Glowing brain wojak understanding $WHSTLR's mission",
    "Wojak spreading $WHSTLR truth to other wojaks",
    "Enlightened wojak holding $WHSTLR token"
  ],
  flux: [
    "Dynamic $WHSTLR energy waves cleansing blockchain networks",
    "Quantum realm visualization of $WHSTLR token flow",
    "$WHSTLR particles exposing dark crypto practices",
    "Abstract representation of $WHSTLR's transparency protocol",
    "Digital art showing $WHSTLR's impact on crypto space"
  ]
};

const styleDescriptions = {
  expose: {
    name: 'Expose Mode',
    description: 'Dramatic reveals of corruption through $WHSTLR lens',
    icon: <SearchIcon />
  },
  pepe: {
    name: 'Pepe Style',
    description: 'Classic Pepe investigating with $WHSTLR',
    icon: <EmojiEmotionsIcon />
  },
  wojak: {
    name: 'Wojak Mode',
    description: 'Wojak reactions to $WHSTLR revelations',
    icon: <FaceIcon />
  },
  flux: {
    name: 'Flux Style',
    description: 'Abstract $WHSTLR energy visualizations',
    icon: <AutoGraphIcon />
  }
};

const generateVisualPrompt = (style) => {
  const basePrompts = visualThemes[style] || visualThemes.expose;
  const tokenPrompt = tokenPrompts[Math.floor(Math.random() * tokenPrompts.length)];
  const visualPrompt = basePrompts[Math.floor(Math.random() * basePrompts.length)];
  
  return `Create a dramatic, high-contrast image: ${visualPrompt}. ${tokenPrompt}. Style: Cinematic lighting, detailed blockchain aesthetics, no text or words in the image. Focus on $WHSTLR token visuals and transparency themes.`;
};

const emotionEnhancers = [
  "shocking revelation",
  "moment of truth",
  "dramatic exposure",
  "undeniable evidence",
  "suspicious activity",
  "caught in the act",
  "red-handed discovery"
];

const whistleblowerPrompts = [
  "Pepe exposing corrupt CEOs running away with funds ",
  "Wojak discovering another rug pull in progress ",
  "When you find the hidden wallet transactions ",
  "Virgin Rug Puller vs Chad Whistleblower ",
  "Pepe reading through sketchy smart contracts ",
  "Wojak watching his investigation go viral ",
  "Me and the boys exposing crypto scams ",
  "That moment when the receipts get leaked ",
  "Gigachad WHSTLR exposing corruption ",
  "Pepe following the money trail ",
  "When the blockchain doesn't lie ",
  "Corrupt CEOs when WHSTLR starts trending ",
];

const MemeGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('classic');
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/stats`);
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleStyleChange = (style) => {
    setSelectedStyle(style);
    setPrompt(generateVisualPrompt(style));
  };

  const handlePromptSelect = (suggestion) => {
    setPrompt(generateVisualPrompt(selectedStyle));
  };

  const handleGenerate = async () => {
    if (!prompt) {
      setError('Please enter a prompt or select one from the suggestions');
      return;
    }

    setGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const fullUrl = `${API_BASE_URL}/api/generate-meme`;
      console.log('Sending request to:', fullUrl);
      console.log('Request payload:', {
        prompt,
        style: selectedStyle,
      });

      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          style: selectedStyle,
        }),
        credentials: 'include',
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (!data.imageUrl) {
        throw new Error('No image URL received from server');
      }

      setGeneratedImage(data.imageUrl);
      await fetchStats(); // Refresh stats after successful generation
    } catch (err) {
      console.error('Failed to generate meme:', err);
      setError(err.message || 'Failed to generate meme. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <GlowContainer maxWidth="md" sx={{ py: 6 }}>
      <AnimatedPaper elevation={0} sx={{ p: 4, borderRadius: 4 }}>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h3" 
            align="center" 
            sx={{ 
              mb: 5,
              background: 'linear-gradient(45deg, #7c4dff 30%, #448aff 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              fontWeight: 'bold'
            }}
          >
            WHSTLR Meme Lab
          </Typography>

          <Grid container spacing={3}>
            {Object.entries(styleDescriptions).map(([key, theme]) => (
              <Grid item xs={12} sm={6} md={3} key={key}>
                <StyledThemeCard 
                  selected={selectedStyle === key}
                  onClick={() => handleStyleChange(key)}
                >
                  <Stack spacing={2} alignItems="center">
                    <IconWrapper>
                      {theme.name === 'Expose Mode' && <SearchIcon />}
                      {theme.name === 'Pepe Style' && <EmojiEmotionsIcon />}
                      {theme.name === 'Wojak Mode' && <FaceIcon />}
                      {theme.name === 'Flux Style' && <AutoGraphIcon />}
                    </IconWrapper>
                    <Typography 
                      variant="h6"
                      sx={{ 
                        fontWeight: 500,
                        color: selectedStyle === key ? '#7c4dff' : 'inherit'
                      }}
                    >
                      {theme.name}
                    </Typography>
                  </Stack>
                </StyledThemeCard>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4, mb: 4 }}>
            <StyledTextField
              fullWidth
              multiline
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Your prompt will be generated based on the selected style..."
              disabled={generating}
              sx={{ mb: 3 }}
            />

            <GenerateButton
              fullWidth
              onClick={handleGenerate}
              disabled={generating}
              startIcon={generating ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {generating ? 'Generating...' : 'Generate Meme'}
            </GenerateButton>
          </Box>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                background: 'rgba(211, 47, 47, 0.1)',
                borderRadius: 2
              }}
            >
              {error}
            </Alert>
          )}

          {generatedImage && (
            <Box 
              sx={{ 
                mt: 4,
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -20,
                  left: -20,
                  right: -20,
                  bottom: -20,
                  background: 'radial-gradient(circle at 50% 50%, rgba(124, 77, 255, 0.1), transparent 70%)',
                  pointerEvents: 'none'
                }
              }}
            >
              <ImageContainer>
                <img 
                  src={generatedImage} 
                  alt="Generated meme" 
                  style={{
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02)'
                    }
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(4px)',
                    color: 'white',
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomLeftRadius: 'inherit',
                    borderBottomRightRadius: 'inherit'
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      {stats?.memesRemaining} memes remaining
                    </Typography>
                    <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      Style: {styleDescriptions[selectedStyle]?.name}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      size="small"
                      onClick={() => window.open(generatedImage, '_blank')}
                      sx={{ 
                        color: 'white',
                        '&:hover': {
                          background: 'rgba(255,255,255,0.1)'
                        }
                      }}
                    >
                      <OpenInNewIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => {
                        const text = `Generated with WHSTLR Meme Lab 🚀\n#WHSTLR #Crypto`;
                        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(generatedImage)}`, '_blank');
                      }}
                      sx={{ 
                        color: 'white',
                        '&:hover': {
                          background: 'rgba(255,255,255,0.1)'
                        }
                      }}
                    >
                      <TwitterIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Box>
              </ImageContainer>
            </Box>
          )}
        </Box>
      </AnimatedPaper>
    </GlowContainer>
  );
};

export default MemeGenerator;
