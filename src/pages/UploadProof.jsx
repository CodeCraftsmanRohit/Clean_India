import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Fixes useNavigate error
import { Box, Card, CardContent, Typography, Button } from "@mui/material"; // ✅ Fixes MUI component errors
import { toast } from "react-toastify"; // ✅ Required for toast.success

const UploadProof = () => {
  const navigate = useNavigate();
  const handleSubmitProof = () => {
    toast.success("Complaint proof submitted successfully!");
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Card sx={{ width: 400, p: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Upload Proof</Typography>
          <input type="file" accept="video/*" id="videoUpload" style={{ display: "none" }} />
          <label htmlFor="videoUpload">
            <Button variant="outlined" component="span" fullWidth>Upload Video</Button>
          </label>
          <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleSubmitProof}>
            Submit
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};
export default UploadProof;
