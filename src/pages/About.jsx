import React from "react";
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";

const About = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      bgcolor="#f3f4f6"
      px={2}
      py={4}
    >
      <Card sx={{ maxWidth: 800, width: "100%", p: { xs: 2, sm: 4 } }}>
        <CardContent>
          <Typography variant="h4" gutterBottom color="primary">
            About <span style={{ color: "#2e7d32" }}>Clean the Nation</span>
          </Typography>

          <Typography variant="body1" paragraph>
            <strong>Clean the Nation</strong> is a citizen-driven platform aimed at empowering people to report garbage in their surroundings and help keep their communities clean. By allowing users to submit complaints with real-time location and images, we bridge the gap between citizens and municipal bodies for quicker waste resolution.
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            🌟 Features
          </Typography>
          <ul style={{ paddingLeft: "1.25rem" }}>
            <li><strong>Photo & Location-Based Complaints:</strong> Report garbage with live GPS and image proof.</li>
            <li><strong>Complaint Tracking:</strong> View your complaint history and track their status.</li>
            <li><strong>Proof Upload:</strong> Upload video proof once an area is cleaned.</li>
            <li><strong>Rewards:</strong> Earn eco-points and recognition for community contributions.</li>
            <li><strong>User Profiles:</strong> View your past activity and associated municipal office.</li>
          </ul>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            🚀 How It Works
          </Typography>
          <ol style={{ paddingLeft: "1.25rem" }}>
            <li>Login to your account (no registration required).</li>
            <li>Click “Submit Complaint” to upload a photo and automatically detect your location.</li>
            <li>Submit the form — your complaint is registered and visible in your history.</li>
            <li>After the issue is resolved, upload a video as proof.</li>
            <li>Track all activities via the History and Profile sections.</li>
          </ol>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            🤝 Our Mission
          </Typography>
          <Typography variant="body2" paragraph>
            Our mission is to build a cleaner, greener nation by harnessing the power of technology and civic responsibility. Every citizen plays a role, and this platform makes it easy and rewarding to take action.
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            📬 Contact Us
          </Typography>
          <Typography variant="body2">
            Have suggestions or feedback? Reach us at{" "}
            <strong>cleannation.support@example.com</strong>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default About;
