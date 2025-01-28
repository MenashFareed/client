import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar.tsx';
import CourtList from './pages/CourtList.tsx';
import theme from './theme.ts';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <CourtList />
      </Router>
    </ThemeProvider>
  );
}

export default App;
