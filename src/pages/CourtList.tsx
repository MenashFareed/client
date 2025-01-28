import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Box,
  CircularProgress
} from '@mui/material';
import CourtCard from '../components/CourtCard.tsx';
import { Court } from '../types/Court.ts';

// Temporary mock data until we connect to the backend
const mockCourts: Court[] = [
  {
    id: '1',
    name: 'Center Court',
    type: 'tennis',
    location: 'Main Building',
    hourlyRate: 50,
    description: 'Professional tennis court with excellent lighting',
    images: ['https://example.com/court1.jpg'],
    status: 'available'
  },
  // Add more mock courts as needed
];

const CourtList = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This will be replaced with actual API call later
    setTimeout(() => {
      setCourts(mockCourts);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Available Courts
      </Typography>
      <Grid container spacing={3}>
        {courts.map((court) => (
          <Grid item xs={12} sm={6} md={4} key={court.id}>
            <CourtCard court={court} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CourtList; 