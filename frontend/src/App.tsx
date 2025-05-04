import React from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme, Box, Typography } from '@mui/material';
import ResumeUploader from './components/ResumeUploader';
import CandidateList from './components/CandidateList';
import FloatingCats from './components/FloatingCats';
import { CatProvider } from './context/CatContext';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#6366F1',
    },
    background: {
      default: '#F9FAFB',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.2,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
  },
});

// Create a grid of possible positions
const createGrid = (cols: number, rows: number) => {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid.push({
        x: (j * 100) / cols,
        y: (i * 100) / rows,
      });
    }
  }
  return grid;
};

// Shuffle array using Fisher-Yates algorithm
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CatProvider>
        <Box
          sx={{
            minHeight: '100vh',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #F9FAFB 0%, #E5E7EB 100%)',
          }}
        >
          <FloatingCats />
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '100%',
                background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
                pointerEvents: 'none',
              },
            }}
          >
            <Container maxWidth="lg" sx={{ py: 6, position: 'relative' }}>
              <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: '4rem',
                    fontWeight: 800,
                    mb: 1,
                    background: 'linear-gradient(135deg, #000000 0%, #6366F1 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '150px',
                      height: '4px',
                      background: 'linear-gradient(90deg, transparent, #6366F1, transparent)',
                      borderRadius: '2px',
                    },
                  }}
                >
                  Resume Catifier
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    mb: 3,
                    color: '#6366F1',
                    fontStyle: 'italic',
                  }}
                >
                  Making resume reviews purr-fectly delightful
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}
                >
                  Transform your resume review process with AI-powered insights and delightful cat content
                </Typography>
              </Box>
              <ResumeUploader />
              <CandidateList />
            </Container>
          </Box>
        </Box>
      </CatProvider>
    </ThemeProvider>
  );
};

export default App; 