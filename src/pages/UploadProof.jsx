import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  CircularProgress
} from "@mui/material";
import { toast } from "react-toastify";

const UploadProof = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const complaintId = location.state?.complaintId;

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) { // 50MB limit for videos
        setError("Video size should be less than 50MB");
        return;
      }
      setVideo(file);
      setError("");
    }
  };

  const handleSubmitProof = async () => {
    if (!video) {
      setError("Please upload a video");
      return;
    }

    if (!complaintId) {
      setError("Complaint ID missing");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append('video', video);
      formData.append('complaintId', complaintId);

      const response = await fetch('http://localhost:4000/api/complaints/upload-proof', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Proof uploaded successfully!");
        setTimeout(() => navigate("/history"), 2000);
      } else {
        setError(data.message || "Failed to upload proof");
      }
    } catch (error) {
      console.error("Upload proof error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" p={2}>
      <Card sx={{ width: 400, p: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center" color="primary">
            Upload Proof
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Upload a video showing that the area has been cleaned
          </Typography>

          <input
            type="file"
            accept="video/*"
            id="videoUpload"
            onChange={handleVideoChange}
            style={{ display: "none" }}
          />
          <label htmlFor="videoUpload">
            <Button
              variant="outlined"
              component="span"
              fullWidth
              sx={{ mb: 2 }}
            >
              {video ? `Selected: ${video.name}` : "Choose Video"}
            </Button>
          </label>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleSubmitProof}
            disabled={loading || !video}
          >
            {loading ? <CircularProgress size={24} /> : "Submit Proof"}
          </Button>

          <Button
            fullWidth
            variant="text"
            sx={{ mt: 1 }}
            onClick={() => navigate("/history")}
          >
            Back to History
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UploadProof;