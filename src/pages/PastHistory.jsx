// src/pages/PastHistory.jsx
import React from "react";
import { Box, Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";
import complaints from "../data/complaints";

const PastHistory = () => {
  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Past Complaint History
      </Typography>
      <Grid container spacing={2}>
        {complaints.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt="Complaint Photo"
              />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.phone}
                </Typography>
                <Typography variant="body2">
                  Location: {item.location}
                </Typography>
                <Typography variant="body2">Date: {item.date}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PastHistory;
