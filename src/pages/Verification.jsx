import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Verification = () => {
  const navigate = useNavigate();
  const { user, sendVerificationOtp, verifyEmail } = useAuth();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendOtp = async () => {
    setSendingOtp(true);
    setMessage("");

    const result = await sendVerificationOtp();

    if (result.success) {
      setMessage("OTP sent to your email address");
    }

    setSendingOtp(false);
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setMessage("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setMessage("");

    const result = await verifyEmail(otp);

    if (result.success) {
      navigate("/");
    } else {
      setMessage(result.message);
    }

    setLoading(false);
  };

  // If user is already verified, redirect to home
  if (user?.isAccountVerified) {
    navigate("/");
    return null;
  }

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
            Verify Your Email
          </Typography>

          <Typography variant="body2" align="center" sx={{ color: '#4c8c4a', mb: 3 }}>
            We've sent a verification code to your email address
          </Typography>

          {message && (
            <Alert severity={message.includes("sent") ? "success" : "error"} sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          <Box sx={{ mb: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleSendOtp}
              disabled={sendingOtp}
              sx={{ mb: 2 }}
            >
              {sendingOtp ? "Sending OTP..." : "Send Verification OTP"}
            </Button>
          </Box>

          <form onSubmit={handleVerify}>
            <TextField
              fullWidth
              label="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              required
              sx={{ mb: 3 }}
              inputProps={{ maxLength: 6 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading || otp.length !== 6}
              sx={{
                py: 1.5,
                fontSize: '1rem',
                background: 'linear-gradient(45deg, #1b5e20 30%, #4c8c4a 90%)'
              }}
            >
              {loading ? "Verifying..." : "Verify Email"}
            </Button>
          </form>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Didn't receive the code? Check your spam folder or request a new one.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Verification;