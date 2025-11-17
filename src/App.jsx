import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Box } from "@mui/material";
import { useAuth, AuthProvider } from "./context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import ComplaintHistory from "./pages/ComplaintHistory";
import PastHistory from "./pages/PastHistory";
import UploadProof from "./pages/UploadProof";
import SubmitComplaint from "./pages/SubmitComplaint";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Footer from "./components/Footer";
import Verification from "./pages/Verification";
import AdminDashboard from './pages/admin/AdminDashboard';
import ComplaintsManagement from './pages/admin/ComplaintsManagement';
import UsersManagement from './pages/admin/UsersManagement';




// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user?.role !== 'admin' && user?.role !== 'moderator') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};


const AppContent = () => {
  return (
    <>
      <ToastContainer position="top-center" />
      <Navbar />
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Box flexGrow={1}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />

            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <SubmitComplaint />
              </ProtectedRoute>
            } />
            <Route path="/submit" element={
              <ProtectedRoute>
                <SubmitComplaint />
              </ProtectedRoute>
            } />
            <Route path="/history" element={
              <ProtectedRoute>
                <ComplaintHistory />
              </ProtectedRoute>
            } />
            <Route path="/upload-proof" element={
              <ProtectedRoute>
                <UploadProof />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/pasthistory" element={
              <ProtectedRoute>
                <PastHistory />
              </ProtectedRoute>
            } />
            <Route path="/verification" element={
              <ProtectedRoute>
                <Verification />
              </ProtectedRoute>
            } />

             {/* Admin Routes */}
  <Route path="/admin/dashboard" element={
    <ProtectedRoute adminOnly={true}>
      <AdminDashboard />
    </ProtectedRoute>
  } />
  <Route path="/admin/complaints" element={
    <ProtectedRoute adminOnly={true}>
      <ComplaintsManagement />
    </ProtectedRoute>
  } />
  <Route path="/admin/users" element={
    <ProtectedRoute adminOnly={true}>
      <UsersManagement />
    </ProtectedRoute>
  } />

            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;