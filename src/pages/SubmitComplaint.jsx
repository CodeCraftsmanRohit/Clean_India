import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ this is the missing import
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField
} from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const SubmitComplaint = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.error(err)
    );
  }, []);

  const handleSubmitComplaint = (e) => {
    e.preventDefault();
    const photoInput = e.target.photo;
    if (!photoInput.files.length) {
      alert("Please upload a photo");
      return;
    }
    // You can add to context or global state
    navigate("/history");
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Card sx={{ width: 400, p: 3 }}>
        <CardContent component="form" onSubmit={handleSubmitComplaint}>
          <Typography variant="h6" gutterBottom>Submit Complaint</Typography>
          <input type="file" name="photo" accept="image/*" id="photoInput" required style={{ display: "none" }} />
          <label htmlFor="photoInput">
            <Button variant="outlined" component="span" fullWidth sx={{ my: 1 }}>
              Upload Photo
            </Button>
          </label>

          <Box height={200} borderRadius={1} overflow="hidden" my={2}>
            {location ? (
              <MapContainer center={[location.lat, location.lng]} zoom={16} style={{ height: "100%", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[location.lat, location.lng]}>
                  <Popup>Your Location</Popup>
                </Marker>
              </MapContainer>
            ) : (
              <Box bgcolor="#e0e0e0" height="100%" display="flex" alignItems="center" justifyContent="center">Detecting Location…</Box>
            )}
          </Box>

          <TextField name="name" label="Your Name" fullWidth required sx={{ mb: 2 }} />
          <TextField name="phone" label="Phone/Number" fullWidth required sx={{ mb: 2 }} />
          <Button type="submit" variant="contained" fullWidth>Submit</Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SubmitComplaint;
