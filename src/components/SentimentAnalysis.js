import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  LinearProgress,
  Chip,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import RefreshIcon from '@mui/icons-material/Refresh';
import TwitterIcon from '@mui/icons-material/Twitter';
import RedditIcon from '@mui/icons-material/Reddit';
import TelegramIcon from '@mui/icons-material/Telegram';

const SentimentAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [sentimentData, setSentimentData] = useState({
    overall: {
      score: 85,
      trend: 'Increasing',
      change: '+5%',
    },
    platforms: {
      twitter: {
        sentiment: 88,
        volume: 'High',
        trending: true,
      },
      telegram: {
        sentiment: 82,
        volume: 'Very High',
        trending: true,
      },
      reddit: {
        sentiment: 78,
        volume: 'Medium',
        trending: false,
      },
    },
    keywords: [
      { word: 'bullish', count: 245 },
      { word: 'moon', count: 189 },
      { word: 'hodl', count: 156 },
      { word: 'pump', count: 134 },
    ],
  });

  const refreshSentiment = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // In real implementation, this would fetch from your sentiment analysis service
    }, 2000);
  };

  return (
    <Card sx={{ 
      background: 'linear-gradient(135deg, rgba(124, 77, 255, 0.1) 0%, rgba(124, 77, 255, 0.05) 100%)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(124, 77, 255, 0.2)',
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SentimentVerySatisfiedIcon /> Community Sentiment
          </Typography>
          <Tooltip title="Refresh Sentiment Analysis">
            <IconButton onClick={refreshSentiment} disabled={loading}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {loading && <LinearProgress sx={{ mb: 2 }} />}

        <Grid container spacing={3}>
          {/* Overall Sentiment */}
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: 'background.paper' }}>
              <CardContent>
                <Typography color="text.secondary">Overall Sentiment</Typography>
                <Typography variant="h3" color="primary" sx={{ my: 2 }}>
                  {sentimentData.overall.score}%
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip 
                    label={`${sentimentData.overall.change} ${sentimentData.overall.trend}`}
                    color="success"
                    size="small"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Platform Analysis */}
          <Grid item xs={12} md={8}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TwitterIcon color="primary" />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">Twitter Sentiment</Typography>
                    <Typography variant="body2">{sentimentData.platforms.twitter.sentiment}%</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={sentimentData.platforms.twitter.sentiment}
                    sx={{ 
                      height: 8,
                      borderRadius: 4,
                      bgcolor: 'rgba(124, 77, 255, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundImage: 'linear-gradient(45deg, #7C4DFF 30%, #B388FF 90%)',
                      },
                    }}
                  />
                </Box>
                <Chip 
                  label={sentimentData.platforms.twitter.volume}
                  size="small"
                  color={sentimentData.platforms.twitter.trending ? "success" : "default"}
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TelegramIcon color="primary" />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">Telegram Sentiment</Typography>
                    <Typography variant="body2">{sentimentData.platforms.telegram.sentiment}%</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={sentimentData.platforms.telegram.sentiment}
                    sx={{ 
                      height: 8,
                      borderRadius: 4,
                      bgcolor: 'rgba(124, 77, 255, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundImage: 'linear-gradient(45deg, #7C4DFF 30%, #B388FF 90%)',
                      },
                    }}
                  />
                </Box>
                <Chip 
                  label={sentimentData.platforms.telegram.volume}
                  size="small"
                  color={sentimentData.platforms.telegram.trending ? "success" : "default"}
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <RedditIcon color="primary" />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">Reddit Sentiment</Typography>
                    <Typography variant="body2">{sentimentData.platforms.reddit.sentiment}%</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={sentimentData.platforms.reddit.sentiment}
                    sx={{ 
                      height: 8,
                      borderRadius: 4,
                      bgcolor: 'rgba(124, 77, 255, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundImage: 'linear-gradient(45deg, #7C4DFF 30%, #B388FF 90%)',
                      },
                    }}
                  />
                </Box>
                <Chip 
                  label={sentimentData.platforms.reddit.volume}
                  size="small"
                  color={sentimentData.platforms.reddit.trending ? "success" : "default"}
                />
              </Box>
            </Stack>
          </Grid>

          {/* Trending Keywords */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Trending Keywords</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {sentimentData.keywords.map((keyword, index) => (
                <Chip
                  key={index}
                  label={`${keyword.word} (${keyword.count})`}
                  sx={{ 
                    backgroundImage: 'linear-gradient(45deg, #7C4DFF 30%, #B388FF 90%)',
                    color: 'white',
                  }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SentimentAnalysis;
