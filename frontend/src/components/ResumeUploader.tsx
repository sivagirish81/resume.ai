import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Paper, Typography, CircularProgress, Button, Stack } from '@mui/material';
import axios from 'axios';
import { useResume } from '../context/ResumeContext';

interface UploadedFile {
  name: string;
  status: 'uploading' | 'success' | 'error';
  catContent?: string;
}

const CloudUploadIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginBottom: '16px' }}
  >
    <path
      d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"
      fill="currentColor"
    />
  </svg>
);

const ResumeUploader: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const { addCandidate } = useResume();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      name: file.name,
      status: 'uploading' as const
    }));
    
    setFiles(prev => [...prev, ...newFiles]);

    for (const file of acceptedFiles) {
      try {
        const formData = new FormData();
        formData.append('resume', file);

        // TODO: Replace with your actual API endpoint
        const response = await axios.post('/api/process-resume', formData);
        
        setFiles(prev => prev.map(f => 
          f.name === file.name 
            ? { ...f, status: 'success', catContent: response.data.catContent }
            : f
        ));

        addCandidate({
          id: Date.now().toString(),
          name: file.name.split('.')[0],
          catContent: response.data.catContent,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        setFiles(prev => prev.map(f => 
          f.name === file.name 
            ? { ...f, status: 'error' }
            : f
        ));
      }
    }
  }, [addCandidate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  });

  return (
    <Box sx={{ my: 4 }}>
      <Paper
        {...getRootProps()}
        sx={{
          p: 8,
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
          border: '2px dashed',
          borderColor: isDragActive ? 'secondary.main' : 'divider',
          borderRadius: 4,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            backgroundColor: 'action.hover',
            transform: 'translateY(-4px)',
            boxShadow: (theme) => theme.shadows[8],
            borderColor: 'secondary.main',
          },
        }}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon />
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          {isDragActive
            ? 'Drop your resume here...'
            : 'Drag and drop your resume here'}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          or
        </Typography>
        <Button
          variant="contained"
          component="span"
          size="large"
          sx={{
            backgroundColor: 'black',
            px: 4,
            py: 1.5,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          Browse Files
        </Button>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          Supported formats: PDF, DOC, DOCX
        </Typography>
      </Paper>

      <Stack spacing={2} sx={{ mt: 4 }}>
        {files.map((file, index) => (
          <Paper
            key={index}
            sx={{
              p: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: 2,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                boxShadow: 2,
              },
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {file.name}
            </Typography>
            {file.status === 'uploading' && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} />
                <Typography variant="body2" color="text.secondary">
                  Processing...
                </Typography>
              </Box>
            )}
            {file.status === 'success' && (
              <Typography
                color="success.main"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontWeight: 500,
                }}
              >
                <span>✓</span> Processed
              </Typography>
            )}
            {file.status === 'error' && (
              <Typography
                color="error"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontWeight: 500,
                }}
              >
                <span>✗</span> Error
              </Typography>
            )}
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default ResumeUploader; 