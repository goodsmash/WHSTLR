import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Stack,
  IconButton,
  Tooltip,
  Grid,
} from '@mui/material';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShowChartIcon from '@mui/icons-material/ShowChart';

const AiInsights = () => {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState({
    pumpProbability: 87,
    communityHealth: 92,
    whaleActivity: 'Low',
    predictedTrend: 'Bullish',
    aiRecommendation: 'Strong Buy',
    confidenceScore: 89,
    marketSentiment: 'Very Positive',
    riskLevel: 'Moderate',
  });

  const [predictions, setPredictions] = useState([
    {
      timeframe: '24h',
      prediction: '+15%',
      confidence: 85,
    },
    {
      timeframe: '7d',
      prediction: '+45%',
      confidence: 78,
    },
  ]);

  const generateNewInsights = () => {
    setLoading(true);
    // Simulate AI analysis
    setTimeout(() => {
      setLoading(false);
      // In real implementation, this would call your AI service
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
            <PsychologyIcon /> AI Insights
          </Typography>
          <Tooltip title="Generate New Insights">
            <IconButton onClick={generateNewInsights} disabled={loading}>
              <AutoGraphIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {loading && <LinearProgress sx={{ mb: 2 }} />}

        <Stack spacing={3}>
          {/* AI Prediction Cards */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ShowChartIcon /> Price Predictions
            </Typography>
            <Stack direction="row" spacing={2}>
              {predictions.map((pred, index) => (
                <Card key={index} sx={{ flex: 1, bgcolor: 'background.paper' }}>
                  <CardContent>
                    <Typography color="text.secondary">{pred.timeframe} Forecast</Typography>
                    <Typography variant="h4" color="primary" sx={{ my: 1 }}>
                      {pred.prediction}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2">Confidence:</Typography>
                      <LinearProgress
                        variant="determinate"
                        value={pred.confidence}
                        sx={{ 
                          flex: 1,
                          height: 8,
                          borderRadius: 4,
                          bgcolor: 'rgba(124, 77, 255, 0.1)',
                          '& .MuiLinearProgress-bar': {
                            backgroundImage: 'linear-gradient(45deg, #7C4DFF 30%, #B388FF 90%)',
                          },
                        }}
                      />
                      <Typography variant="body2">{pred.confidence}%</Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>

          {/* Market Insights */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TrendingUpIcon /> Market Analysis
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <Box>
                    <Typography color="text.secondary">Pump Probability</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h5">{insights.pumpProbability}%</Typography>
                      <LinearProgress
                        variant="determinate"
                        value={insights.pumpProbability}
                        sx={{ 
                          flex: 1,
                          height: 8,
                          borderRadius: 4,
                          bgcolor: 'rgba(124, 77, 255, 0.1)',
                          '& .MuiLinearProgress-bar': {
                            backgroundImage: 'linear-gradient(45deg, #7C4DFF 30%, #B388FF 90%)',
                          },
                        }}
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Typography color="text.secondary">Community Health</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h5">{insights.communityHealth}%</Typography>
                      <LinearProgress
                        variant="determinate"
                        value={insights.communityHealth}
                        sx={{ 
                          flex: 1,
                          height: 8,
                          borderRadius: 4,
                          bgcolor: 'rgba(124, 77, 255, 0.1)',
                          '& .MuiLinearProgress-bar': {
                            backgroundImage: 'linear-gradient(45deg, #7C4DFF 30%, #B388FF 90%)',
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography color="text.secondary">AI Recommendation</Typography>
                    <Chip
                      label={insights.aiRecommendation}
                      color="success"
                      sx={{ 
                        backgroundImage: 'linear-gradient(45deg, #7C4DFF 30%, #B388FF 90%)',
                        color: 'white',
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography color="text.secondary">Predicted Trend</Typography>
                    <Chip label={insights.predictedTrend} color="primary" />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography color="text.secondary">Whale Activity</Typography>
                    <Chip label={insights.whaleActivity} />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography color="text.secondary">Risk Level</Typography>
                    <Chip label={insights.riskLevel} color="warning" />
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AiInsights;
