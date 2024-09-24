import React from 'react';
import { Paper, Box } from '@mui/material';

interface ElevatedPaperProps {
    children: React.ReactNode;
    elevation?: number;
}

const ElevatedPaper = ({ children, elevation = 5 }: ElevatedPaperProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px',}}>
      <Paper
        elevation={5}
        sx={{
          padding: '20px',
          textAlign: 'center',
          width: '600px',
          borderRadius: '8px',
        }}
      >
        {children}
      </Paper>
    </Box>
  );
};

export default ElevatedPaper;
