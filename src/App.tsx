import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar.tsx';
import CourtList from './pages/CourtList.tsx';
import theme from './theme.ts';
import Login from './components/Login.tsx';
import Register from './components/Register.tsx';
import Profile from './pages/Profile.tsx';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<CourtList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
