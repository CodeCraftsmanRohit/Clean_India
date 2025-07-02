import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Box } from "@mui/material";

import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import ComplaintHistory from "./pages/ComplaintHistory";
import PastHistory from "./pages/PastHistory";
import UploadProof from "./pages/UploadProof";
import SubmitComplaint from "./pages/SubmitComplaint";
import Login from "./pages/Login";
import About from "./pages/About"; // ✅ Add this
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <ToastContainer position="top-center" />
      <Navbar />
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Box flexGrow={1}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/submit" element={<SubmitComplaint />} />
            <Route path="/history" element={<ComplaintHistory />} />
            <Route path="/upload-proof" element={<UploadProof />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/pasthistory" element={<PastHistory />} />
            <Route path="/about" element={<About />} />

          </Routes>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default App;
