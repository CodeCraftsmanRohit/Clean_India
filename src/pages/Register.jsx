import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Link as MuiLink,
  Alert,
  CircularProgress
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (!formData.email.includes('@')) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    const result = await register(formData.name, formData.email, formData.password);

    if (result.success) {
      if (result.emailFailed) {
        // Email failed but registration was successful
        toast.info("Account created! Welcome email failed, but you can login.");
        navigate("/");
      } else {
        // Everything successful
        navigate("/");
      }
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      sx={{
        background: 'linear-gradient(135deg, #f5f5f5 0%, #e8f5e9 100%)'
      }}
    >
      <Card sx={{
        width: 400,
        p: 4,
        borderLeft: '6px solid #1b5e20'
      }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 600, color: '#1b5e20' }}>
            Create Account
          </Typography>

          <Typography variant="body2" align="center" sx={{ color: '#4c8c4a', mb: 3 }}>
            Join Clean India and make a difference
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              sx={{ mb: 2 }}
              helperText="Password must be at least 6 characters"
            />

            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                fontSize: '1rem',
                background: 'linear-gradient(45deg, #1b5e20 30%, #4c8c4a 90%)',
                mb: 2
              }}
            >
              {loading ? (
                <Box display="flex" alignItems="center">
                  <CircularProgress size={20} sx={{ color: 'white', mr: 1 }} />
                  Creating Account...
                </Box>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <MuiLink
                component={Link}
                to="/login"
                sx={{
                  color: '#1b5e20',
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Sign In
              </MuiLink>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;