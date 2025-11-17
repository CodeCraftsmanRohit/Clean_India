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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, sendResetOtp, resetPassword } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [resetData, setResetData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [resetStep, setResetStep] = useState(1); // 1: email, 2: OTP & new password
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleResetChange = (e) => {
    setResetData({
      ...resetData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate("/");
    }

    setLoading(false);
  };

  const handleResetPassword = async () => {
    if (resetStep === 1) {
      // Send OTP
      setResetLoading(true);
      const result = await sendResetOtp(resetData.email);
      if (result.success) {
        setResetStep(2);
      }
      setResetLoading(false);
    } else {
      // Reset password
      if (resetData.newPassword !== resetData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      if (resetData.newPassword.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }

      setResetLoading(true);
      const result = await resetPassword(resetData.email, resetData.otp, resetData.newPassword);
      if (result.success) {
        setResetDialogOpen(false);
        setResetStep(1);
        setResetData({ email: "", otp: "", newPassword: "", confirmPassword: "" });
      }
      setResetLoading(false);
    }
  };

  const handleResetDialogClose = () => {
    setResetDialogOpen(false);
    setResetStep(1);
    setResetData({ email: "", otp: "", newPassword: "", confirmPassword: "" });
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
        <CardContent sx={{ textAlign: 'center' }}>
          <Box sx={{
            bgcolor: '#e8f5e9',
            p: 2,
            mb: 3,
            borderRadius: 2,
            borderLeft: '4px solid #ffc107'
          }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Welcome to <span style={{ color: '#1b5e20' }}>Clean India</span>
            </Typography>
            <Typography variant="body2" sx={{ color: '#4c8c4a' }}>
              Report garbage and earn rewards
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
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
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Don't have an account?{" "}
              <MuiLink
                component={Link}
                to="/register"
                sx={{
                  color: '#1b5e20',
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Sign Up
              </MuiLink>
            </Typography>

            <MuiLink
              component="button"
              type="button"
              onClick={() => setResetDialogOpen(true)}
              sx={{
                color: '#d32f2f',
                fontWeight: 500,
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Forgot Password?
            </MuiLink>
          </Box>
        </CardContent>
      </Card>

      {/* Password Reset Dialog */}
      <Dialog open={resetDialogOpen} onClose={handleResetDialogClose}>
        <DialogTitle>
          Reset Password
        </DialogTitle>
        <DialogContent>
          {resetStep === 1 ? (
            <TextField
              autoFocus
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              name="email"
              value={resetData.email}
              onChange={handleResetChange}
              sx={{ mt: 1 }}
            />
          ) : (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="OTP"
                type="text"
                fullWidth
                variant="outlined"
                name="otp"
                value={resetData.otp}
                onChange={handleResetChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="New Password"
                type="password"
                fullWidth
                variant="outlined"
                name="newPassword"
                value={resetData.newPassword}
                onChange={handleResetChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Confirm New Password"
                type="password"
                fullWidth
                variant="outlined"
                name="confirmPassword"
                value={resetData.confirmPassword}
                onChange={handleResetChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResetDialogClose}>Cancel</Button>
          <Button
            onClick={handleResetPassword}
            disabled={resetLoading}
            variant="contained"
          >
            {resetLoading ? "Processing..." : resetStep === 1 ? "Send OTP" : "Reset Password"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Login;