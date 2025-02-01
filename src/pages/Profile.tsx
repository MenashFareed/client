import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Tab,
  Tabs,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '../hooks/redux.ts';
import { fetchBookings } from '../store/slices/bookingsSlice.ts';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { bookings, loading, error } = useAppSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const now = new Date();
  const upcomingBookings = bookings.filter(
    booking => new Date(booking.startTime) > now
  );
  const pastBookings = bookings.filter(
    booking => new Date(booking.startTime) <= now
  );

  const renderBookingTable = (bookings: any[]) => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Court</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.courtId.name}</TableCell>
              <TableCell>
                {new Date(booking.startTime).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(booking.startTime).toLocaleTimeString()}
              </TableCell>
              <TableCell>
                {(new Date(booking.endTime).getTime() - 
                  new Date(booking.startTime).getTime()) / 
                  (1000 * 60 * 60)} hours
              </TableCell>
              <TableCell>
                <Chip 
                  label={booking.status}
                  color={
                    booking.status === 'confirmed' ? 'success' :
                    booking.status === 'pending' ? 'warning' :
                    'default'
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Profile
        </Typography>
        <Typography variant="subtitle1">
          Welcome back, {user?.firstName} {user?.lastName}
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Upcoming Bookings" />
          <Tab label="Booking History" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        {upcomingBookings.length > 0 ? (
          renderBookingTable(upcomingBookings)
        ) : (
          <Typography>No upcoming bookings</Typography>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {pastBookings.length > 0 ? (
          renderBookingTable(pastBookings)
        ) : (
          <Typography>No booking history</Typography>
        )}
      </TabPanel>
    </Container>
  );
};

export default Profile; 