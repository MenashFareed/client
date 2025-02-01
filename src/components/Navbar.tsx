import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/redux.ts';
import { logout } from '../store/slices/authSlice.ts';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { token, user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: 'inherit' 
          }}
        >
          Court Booking
        </Typography>
        <Box>
          {token ? (
            <>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/profile"
              >
                Profile
              </Button>
              <Button 
                color="inherit"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/login"
              >
                Login
              </Button>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/register"
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 