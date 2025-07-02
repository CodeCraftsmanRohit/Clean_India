import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const Login = () => {
  const navigate = useNavigate();

  return (
   <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" sx={{
      background: 'linear-gradient(135deg, #f5f5f5 0%, #e8f5e9 100%)'
    }}>
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

          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate("/submit")}
            sx={{
              mt: 2,
              py: 1.5,
              fontSize: '1rem',
              background: 'linear-gradient(45deg, #1b5e20 30%, #4c8c4a 90%)'
            }}
          >
            Get Started
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
