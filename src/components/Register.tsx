import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
  CircularProgress,
  Grid,
  Link,
} from '@mui/material';
import { useAppDispatch } from '../hooks/redux.ts';
import { register } from '../store/slices/authSlice.ts';

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for the field being edited
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await dispatch(register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
      })).unwrap();
      navigate('/');
    } catch (err: any) {
      console.error('Registration error:', err);
      setSubmitError(err?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        
        {submitError && (
          <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
            {submitError}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                required
                fullWidth
                label="First Name"
                autoFocus
                value={formData.firstName}
                onChange={handleChange}
                disabled={loading}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="lastName"
                required
                fullWidth
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                disabled={loading}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                required
                fullWidth
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="phone"
                required
                fullWidth
                label="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                disabled={loading}
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                required
                fullWidth
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="confirmPassword"
                required
                fullWidth
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register; 