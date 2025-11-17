import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Alert,
  CircularProgress
} from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { toast } from "react-toastify";
import "leaflet/dist/leaflet.css";

const SubmitComplaint = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: ""
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      }),
      (err) => {
        console.error("Geolocation error:", err);
        setError("Unable to get your location. Please enable location services.");
      }
    );
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("Image size should be less than 10MB");
        return;
      }
      setImage(file);
      setError("");
    }
  };

  const handleSubmitComplaint = async (e) => {
    e.preventDefault();

    if (!image) {
      setError("Please upload a photo");
      return;
    }

    if (!location) {
      setError("Please wait for location detection or enable location services");
      return;
    }

    if (!formData.name || !formData.phone) {
      setError("Name and phone are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const submitData = new FormData();
      submitData.append('image', image);
      submitData.append('name', formData.name);
      submitData.append('phone', formData.phone);
      submitData.append('lat', location.lat.toString());
      submitData.append('lng', location.lng.toString());
      submitData.append('address', formData.address);

      const response = await fetch('http://localhost:4000/api/complaints/submit', {
        method: 'POST',
        credentials: 'include',
        body: submitData
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Complaint submitted successfully!");
        navigate("/history");
      } else {
        setError(data.message || "Failed to submit complaint");
      }
    } catch (error) {
      console.error("Submit complaint error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" p={2}>
      <Card sx={{ maxWidth: 600, width: "100%", p: 3 }}>
        <CardContent component="form" onSubmit={handleSubmitComplaint}>
          <Typography variant="h5" gutterBottom align="center" color="primary">
            Submit Complaint
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            id="photoInput"
            onChange={handleImageChange}
            required
            style={{ display: "none" }}
          />
          <label htmlFor="photoInput">
            <Button
              variant="outlined"
              component="span"
              fullWidth
              sx={{ mb: 2 }}
            >
              {image ? `Selected: ${image.name}` : "Upload Photo"}
            </Button>
          </label>

          {/* Map */}
          <Box height={300} borderRadius={1} overflow="hidden" mb={2}>
            {location ? (
              <MapContainer
                center={[location.lat, location.lng]}
                zoom={16}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[location.lat, location.lng]}>
                  <Popup>Your Current Location</Popup>
                </Marker>
              </MapContainer>
            ) : (
              <Box
                bgcolor="#e0e0e0"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography>Detecting Location…</Typography>
              </Box>
            )}
          </Box>

          {/* Form Fields */}
          <TextField
            name="name"
            label="Your Name"
            fullWidth
            required
            value={formData.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="phone"
            label="Phone Number"
            fullWidth
            required
            value={formData.phone}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="address"
            label="Address (Optional)"
            fullWidth
            multiline
            rows={2}
            value={formData.address}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} /> : "Submit Complaint"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SubmitComplaint;