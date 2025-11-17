import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  TextField,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Alert,
  CircularProgress
} from '@mui/material';
import { Edit as EditIcon, Visibility as ViewIcon } from '@mui/icons-material';

const ComplaintsManagement = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    search: ''
  });
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  useEffect(() => {
    fetchComplaints();
  }, [page, rowsPerPage, filters]);

  const fetchComplaints = async () => {
    try {
      const queryParams = new URLSearchParams({
        page: page + 1,
        limit: rowsPerPage,
        ...filters
      });

      const response = await fetch(`http://localhost:4000/api/admin/complaints?${queryParams}`, {
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success) {
        setComplaints(data.complaints);
        setTotalComplaints(data.totalComplaints);
      }
    } catch (error) {
      console.error('Failed to fetch complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateComplaint = async (complaintId, updateData) => {
    try {
      const response = await fetch(`http://localhost:4000/api/admin/complaints/${complaintId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updateData)
      });

      const data = await response.json();

      if (data.success) {
        fetchComplaints();
        setEditDialogOpen(false);
      }
    } catch (error) {
      console.error('Failed to update complaint:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'success';
      case 'in-progress': return 'warning';
      case 'pending': return 'error';
      case 'rejected': return 'default';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, color: '#1b5e20' }}>
        Complaints Management
      </Typography>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" gap={2} flexWrap="wrap">
            <TextField
              label="Search"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              size="small"
            />
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                label="Status"
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="resolved">Resolved</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={filters.priority}
                label="Priority"
                onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      {/* Complaints Table */}
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Submitted</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {complaints.map((complaint) => (
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
                      {complaint.address || 'Location only'}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={complaint.status}
                        color={getStatusColor(complaint.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={complaint.priority}
                        color={getPriorityColor(complaint.priority)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(complaint.submittedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Button
                          size="small"
                          startIcon={<ViewIcon />}
                          onClick={() => {
                            setSelectedComplaint(complaint);
                            setViewDialogOpen(true);
                          }}
                        >
                          View
                        </Button>
                        <Button
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => {
                            setSelectedComplaint(complaint);
                            setEditDialogOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalComplaints}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
          />
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Complaint</DialogTitle>
        <DialogContent>
          {selectedComplaint && (
            <Box display="flex" flexDirection="column" gap={2} mt={2}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={selectedComplaint.status}
                  label="Status"
                  onChange={(e) => setSelectedComplaint({
                    ...selectedComplaint,
                    status: e.target.value
                  })}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="resolved">Resolved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={selectedComplaint.priority}
                  label="Priority"
                  onChange={(e) => setSelectedComplaint({
                    ...selectedComplaint,
                    priority: e.target.value
                  })}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Admin Notes"
                multiline
                rows={3}
                value={selectedComplaint.adminNotes || ''}
                onChange={(e) => setSelectedComplaint({
                  ...selectedComplaint,
                  adminNotes: e.target.value
                })}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => handleUpdateComplaint(selectedComplaint._id, {
              status: selectedComplaint.status,
              priority: selectedComplaint.priority,
              adminNotes: selectedComplaint.adminNotes
            })}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Complaint Details</DialogTitle>
        <DialogContent>
          {selectedComplaint && (
            <Box display="flex" flexDirection="column" gap={2}>
              <img
                src={selectedComplaint.image}
                alt="Complaint"
                style={{
                  width: '100%',
                  maxHeight: '400px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />

              <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                <Box>
                  <Typography variant="h6">User Information</Typography>
                  <Typography><strong>Name:</strong> {selectedComplaint.name}</Typography>
                  <Typography><strong>Phone:</strong> {selectedComplaint.phone}</Typography>
                  <Typography><strong>Email:</strong> {selectedComplaint.user?.email}</Typography>
                </Box>

                <Box>
                  <Typography variant="h6">Complaint Details</Typography>
                  <Typography><strong>Status:</strong>
                    <Chip
                      label={selectedComplaint.status}
                      color={getStatusColor(selectedComplaint.status)}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Typography>
                  <Typography><strong>Priority:</strong>
                    <Chip
                      label={selectedComplaint.priority}
                      color={getPriorityColor(selectedComplaint.priority)}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Typography>
                  <Typography><strong>Submitted:</strong> {new Date(selectedComplaint.submittedAt).toLocaleString()}</Typography>
                </Box>
              </Box>

              {selectedComplaint.address && (
                <Box>
                  <Typography variant="h6">Address</Typography>
                  <Typography>{selectedComplaint.address}</Typography>
                </Box>
              )}

              {selectedComplaint.adminNotes && (
                <Box>
                  <Typography variant="h6">Admin Notes</Typography>
                  <Typography>{selectedComplaint.adminNotes}</Typography>
                </Box>
              )}

              {selectedComplaint.proofVideo && (
                <Box>
                  <Typography variant="h6">Proof Video</Typography>
                  <video
                    controls
                    style={{ width: '100%', maxHeight: '300px' }}
                  >
                    <source src={selectedComplaint.proofVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ComplaintsManagement;