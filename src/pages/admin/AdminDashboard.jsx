import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  People as PeopleIcon,
  Report as ReportIcon,
  PendingActions as PendingIcon,
  CheckCircle as ResolvedIcon,
  TrendingUp as TrendingIcon
} from '@mui/icons-material';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, complaintsRes] = await Promise.all([
        fetch('http://localhost:4000/api/admin/dashboard/stats', {
          credentials: 'include'
        }),
        fetch('http://localhost:4000/api/admin/complaints?limit=5', {
          credentials: 'include'
        })
      ]);

      const statsData = await statsRes.json();
      const complaintsData = await complaintsRes.json();

      if (statsData.success) {
        setStats(statsData.stats);
      }
      if (complaintsData.success) {
        setRecentComplaints(complaintsData.complaints);
      }
    } catch (error) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'success';
      case 'in-progress': return 'warning';
      case 'pending': return 'error';
      default: return 'default';
    }
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
        Admin Dashboard
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      {stats && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card sx={{ bgcolor: '#e8f5e9' }}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <PeopleIcon color="primary" />
                  <Box ml={2}>
                    <Typography variant="h6" fontWeight="bold">
                      {stats.totalUsers}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Total Users
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <Card sx={{ bgcolor: '#e3f2fd' }}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <ReportIcon color="primary" />
                  <Box ml={2}>
                    <Typography variant="h6" fontWeight="bold">
                      {stats.totalComplaints}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Total Complaints
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <Card sx={{ bgcolor: '#fff3e0' }}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <PendingIcon color="warning" />
                  <Box ml={2}>
                    <Typography variant="h6" fontWeight="bold">
                      {stats.pendingComplaints}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Pending
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <Card sx={{ bgcolor: '#e8f5e9' }}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <ResolvedIcon color="success" />
                  <Box ml={2}>
                    <Typography variant="h6" fontWeight="bold">
                      {stats.resolvedComplaints}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Resolved
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <Card sx={{ bgcolor: '#f3e5f5' }}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <TrendingIcon color="secondary" />
                  <Box ml={2}>
                    <Typography variant="h6" fontWeight="bold">
                      {stats.recentComplaints}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      This Week
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Recent Complaints Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Complaints
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Submitted</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentComplaints.map((complaint) => (
                  <TableRow key={complaint._id}>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {complaint.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {complaint.user?.email}
                      </Typography>
                    </TableCell>
                    <TableCell>{complaint.phone}</TableCell>
                    <TableCell>
                      {complaint.address || `${complaint.location.lat.toFixed(4)}, ${complaint.location.lng.toFixed(4)}`}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={complaint.status}
                        color={getStatusColor(complaint.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(complaint.submittedAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminDashboard;