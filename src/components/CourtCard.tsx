import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Court } from '../types/Court';

interface CourtCardProps {
  court: Court;
}

const CourtCard = ({ court }: CourtCardProps) => {
  const navigate = useNavigate();

  const statusColor = {
    available: 'success',
    maintenance: 'error',
    blocked: 'warning'
  }[court.status] as 'success' | 'error' | 'warning';

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={court.images[0]}
        alt={court.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {court.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {court.description}
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary">
            ${court.hourlyRate}/hour
          </Typography>
          <Chip 
            label={court.status} 
            color={statusColor}
            size="small"
          />
        </Box>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate(`/courts/${court.id}`)}
          disabled={court.status !== 'available'}
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourtCard; 