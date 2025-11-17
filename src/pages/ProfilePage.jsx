import React from "react";
import { Card, CardContent, Typography, Avatar, Box, Button, Chip } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  const handleVerifyClick = () => {
    navigate("/verification");
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" sx={{
      background: 'radial-gradient(circle, #f5f5f5 0%, #e0e0e0 100%)'
    }}>
      <Card sx={{
        width: 360,
        p: 3,
        borderTop: '4px solid #1b5e20',
        boxShadow: '0 10px 20px rgba(0,0,0,0.08)'
      }}>
        <CardContent>
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                border: '3px solid #1b5e20',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                bgcolor: '#1b5e20',
                fontSize: '2rem'
              }}
            >
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </Avatar>
          </Box>

          <Typography
            variant="h6"
            gutterBottom
            align="center"
            sx={{
              color: '#1b5e20',
              fontWeight: 600
            }}
          >
            {user.name}
          </Typography>

          <Box display="flex" justifyContent="center" mb={2}>
            <Chip
              label={user.isAccountVerified ? "Verified" : "Not Verified"}
              color={user.isAccountVerified ? "success" : "warning"}
              variant="outlined"
            />
          </Box>

          {!user.isAccountVerified && (
            <Box sx={{ mb: 2, textAlign: 'center' }}>
              <Button
                variant="contained"
                size="small"
                onClick={handleVerifyClick}
                sx={{
                  background: 'linear-gradient(45deg, #ffc107 30%, #ffca28 90%)',
                  color: 'black'
                }}
              >
                Verify Account
              </Button>
            </Box>
          )}

          <Box mt={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Email:</Typography>
            <Typography variant="body2" gutterBottom sx={{ mb: 2 }}>{user.email}</Typography>

            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Status:</Typography>
            <Typography variant="body2" gutterBottom>
              {user.isAccountVerified
                ? "Your account is fully verified and active"
                : "Please verify your email to access all features"
              }
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;