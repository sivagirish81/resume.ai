import React, { useState, useEffect, useRef } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme, Box, Typography, keyframes, Card, CardContent, CardMedia } from '@mui/material';
import Slider from 'react-slick';
import FloatingCats from './components/FloatingCats';
import { CatProvider } from './context/CatContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

const fadeInOut = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`;

const App: React.FC = () => {
  const catchphrases = [
    'purr-fectly delightful',
    'cat-tastically amazing',
    'meow-velously efficient',
  ];
  const [currentPhrase, setCurrentPhrase] = useState(catchphrases[0]);
  const [resumes, setResumes] = useState<any[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null); // Reference to the audio element

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => {
        const currentIndex = catchphrases.indexOf(prev);
        const nextIndex = (currentIndex + 1) % catchphrases.length;
        return catchphrases[nextIndex];
      });
    }, 5000); // Interval between changes (5 seconds)

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fetch resumes from the sandbox API
    const fetchResumes = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // Replace with sandbox API URL
        const data = await response.json();
        // Map the data to match the required structure
        const formattedData = data.slice(0, 5).map((item: any) => ({
          candidateName: `Candidate ${item.id}`,
          resumeImage: `/uploads/${item.id}.webp`, // Dynamically load the image based on candidate ID
          audio: `/uploads/${item.id}.mp3`, // Replace with actual audio URL
        }));
        setResumes(formattedData);
      } catch (error) {
        console.error('Error fetching resumes:', error);
      }
    };

    fetchResumes();
  }, []);

  // Slider settings for react-slick
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    beforeChange: (current: number, next: number) => {
      if (audioRef.current) {
        audioRef.current.pause(); // Pause the current audio
        audioRef.current.src = resumes[next].audio; // Update the audio source to the next candidate's audio
        //audioRef.current.play(); // Play the next audio
      }
    },
  };

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
                    textShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
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
                  Make your resume review process{' '}
                  <span
                    style={{
                      color: '#FF5733', // Highlight color
                      animation: `${fadeInOut} 5s infinite`,
                      textShadow: '0px 4px 6px rgba(255, 87, 51, 0.5)',
                    }}
                  >
                    {currentPhrase}
                  </span>
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}
                >
                  Transform your resume review process with AI-powered insights and delightful cat content
                </Typography>
                <Container maxWidth="lg" sx={{ py: 6 }}>
                  <Typography
                    variant="h1"
                    sx={{
                      textAlign: 'center',
                      fontSize: '3rem',
                      fontWeight: 700,
                      mb: 4,
                      color: '#6366F1',
                    }}
                  >
                    Reviewed Resumes
                  </Typography>
                  <Slider {...sliderSettings}>
                    {resumes.map((resume, index) => (
                      <Card
                        key={index}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          padding: 4,
                          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                          borderRadius: '12px',
                        }}
                      >
                        <CardContent>
                          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                            {resume.candidateName}
                          </Typography>
                        </CardContent>
                        <CardMedia
                          component="img"
                          src={resume.resumeImage} // Dynamically load the image
                          alt={`${resume.candidateName}'s Resume`}
                          sx={{
                            width: '100%',
                            maxWidth: '600px', // Set a smaller maximum width
                            maxHeight: '600px', // Set a smaller maximum height
                            objectFit: 'contain', // Maintain aspect ratio
                            borderRadius: '8px',
                            marginBottom: 2, // Add spacing below the image
                            display: 'flex', // Ensure the image is treated as a flex item
                            justifyContent: 'center', // Center horizontally
                            alignItems: 'center', // Center vertically
                            margin: '0 auto', // Center the image within the card
                          }}
                        />
                        <audio
                          ref={index === 0 ? audioRef : null} // Attach the ref to the first audio element
                          src={resume.audio}
                          controls
                          style={{
                            width: '100%', // Make the audio player span the full width of the card
                            marginTop: '16px', // Add spacing above the audio player
                          }}
                        />
                      </Card>
                    ))}
                  </Slider>
                </Container>
              </Box>
            </Container>
          </Box>
        </Box>
      </CatProvider>
    </ThemeProvider>
  );
};

export default App;