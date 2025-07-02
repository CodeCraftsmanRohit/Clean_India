import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ MISSING IMPORT FIXED
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

const ComplaintHistory = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Card sx={{ width: 400, p: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Complaint History</Typography>
          {/* Display static/dummy complaints here */}
          <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/upload-proof")}>
            Upload Proof
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ComplaintHistory;
