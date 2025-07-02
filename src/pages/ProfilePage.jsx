import React from "react";
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";

const ProfilePage = () => {
  const user = {
    name: "Alice",
    phone: "+91-9876543210",
    address: "221B Baker Street, Delhi",
    office: "Karol Bagh Municipal Office",
    photo: "https://picsum.photos/200", // random image
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
              src={user.photo}
              sx={{
                width: 100,
                height: 100,
                border: '3px solid #1b5e20',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}
            />
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

          <Typography variant="body2" color="textSecondary" align="center" gutterBottom>
            {user.phone}
          </Typography>
          <Box mt={2}>
            <Typography variant="subtitle2">Address:</Typography>
            <Typography variant="body2" gutterBottom>{user.address}</Typography>

            <Typography variant="subtitle2">Nearest Municipal Office:</Typography>
            <Typography variant="body2">{user.office}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
