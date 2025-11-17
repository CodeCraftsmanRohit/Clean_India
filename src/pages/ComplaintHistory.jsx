import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  Alert,
  CircularProgress
} from "@mui/material";
import { toast } from "react-toastify";

const ComplaintHistory = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/complaints/history', {
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success) {
        setComplaints(data.complaints);
      } else {
        setError("Failed to load complaints");
      }
    } catch (error) {
      console.error("Fetch complaints error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'success';
      case 'in-progress': return 'warning';
      case 'pending': return 'default';
      default: return 'default';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, color: '#1b5e20' }}>
        Your Complaint History
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {complaints.length === 0 ? (
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary">
            No complaints submitted yet
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => navigate("/submit")}
          >
            Submit Your First Complaint
          </Button>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {complaints.map((complaint) => (
            <Grid item xs={12} md={6} lg={4} key={complaint._id}>
              <Card sx={{
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' }
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="div" sx={{ flex: 1 }}>
                      {complaint.name}
                    </Typography>
                    <Chip
                      label={complaint.status}
                      color={getStatusColor(complaint.status)}
                      size="small"
                    />
                  </Box>

                  <Box sx={{ mb: 2, borderRadius: 1, overflow: 'hidden' }}>
                    <img
                      src={complaint.image}
                      alt="Complaint"
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover'
                      }}
                    />
                  </Box>

                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    <strong>Phone:</strong> {complaint.phone}
                  </Typography>

                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    <strong>Submitted:</strong> {formatDate(complaint.submittedAt)}
                  </Typography>

                  {complaint.address && (
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      <strong>Address:</strong> {complaint.address}
                    </Typography>
                  )}

                  {complaint.status === 'resolved' && complaint.proofVideo && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="success.main" gutterBottom>
                        <strong>✅ Resolved with Proof</strong>
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => window.open(complaint.proofVideo, '_blank')}
                      >
                        View Proof Video
                      </Button>
                    </Box>
                  )}

                  {complaint.status !== 'resolved' && !complaint.proofVideo && (
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ mt: 2 }}
                      onClick={() => navigate("/upload-proof", { state: { complaintId: complaint._id } })}
                    >
                      Upload Proof
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ComplaintHistory;