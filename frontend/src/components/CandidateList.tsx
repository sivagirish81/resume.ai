import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Grid,
  Skeleton,
} from '@mui/material';
import { useResume } from '../context/ResumeContext';

const CandidateList: React.FC = () => {
  const { candidates } = useResume();

  if (candidates.length === 0) {
    return (
      <Box
        sx={{
          mt: 8,
          textAlign: 'center',
          p: 4,
          borderRadius: 4,
          backgroundColor: 'background.paper',
          boxShadow: 1,
        }}
      >
        <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
          No resumes processed yet
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Upload some resumes to see them here!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 8 }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: 700,
          mb: 4,
          background: 'linear-gradient(135deg, #000000 0%, #6366F1 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Processed Resumes
      </Typography>
      <Grid
        container
        spacing={4}
        sx={{
          '& .MuiCard-root': {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: (theme) => theme.shadows[8],
            },
          },
        }}
      >
        {candidates.map((candidate) => (
          <Grid item xs={12} sm={6} md={4} key={candidate.id}>
            <Card>
              <CardMedia
                component="img"
                height="240"
                image={candidate.catContent}
                alt={`Cat representation for ${candidate.name}`}
                sx={{
                  objectFit: 'cover',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              />
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: 600, mb: 2 }}
                >
                  {candidate.name}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label={new Date(candidate.timestamp).toLocaleDateString()}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(0, 0, 0, 0.08)',
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.12)',
                      },
                    }}
                  />
                  <Chip
                    label="Processed"
                    color="success"
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(46, 125, 50, 0.1)',
                      color: 'success.main',
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: 'rgba(46, 125, 50, 0.2)',
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CandidateList; 