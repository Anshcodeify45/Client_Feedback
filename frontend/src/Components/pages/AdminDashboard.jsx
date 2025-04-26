import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { getAllFeedbacks } from '../API/feedbackApi';
import FeedbackCard from '../FeedbackCard';

import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  Skeleton,
  Snackbar,
  Alert,
  Pagination,
} from '@mui/material';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [feedbacks, setFeedbacks] = useState([]);
  const [filterRating, setFilterRating] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [page, setPage] = useState(1);
  const itemsPerPage = 6; // Change this if you want more/less per page

  useEffect(() => {
    fetchFeedbacks();
  }, [filterRating, sortOrder]);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const query = `?rating=${filterRating}&sort=${sortOrder}`;
      const { data } = await getAllFeedbacks(user.token, query);
      setFeedbacks(data);
      setSnackbar({ open: true, message: 'Feedbacks loaded successfully!', severity: 'success' });
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      setSnackbar({ open: true, message: 'Failed to load feedbacks!', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Pagination logic
  const paginatedFeedbacks = feedbacks.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: 4, marginBottom: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Admin Dashboard
        </Typography>

        {/* Filters */}
        <Paper elevation={4} sx={{ padding: 3, marginBottom: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="filter-rating-label">
                  <FilterAltIcon sx={{ marginRight: 1, verticalAlign: 'middle' }} />
                  Filter by Rating
                </InputLabel>
                <Select
                  labelId="filter-rating-label"
                  value={filterRating}
                  label="Filter by Rating"
                  onChange={(e) => setFilterRating(e.target.value)}
                >
                  <MenuItem value="">All Ratings</MenuItem>
                  <MenuItem value="5">5 Stars</MenuItem>
                  <MenuItem value="4">4 Stars</MenuItem>
                  <MenuItem value="3">3 Stars</MenuItem>
                  <MenuItem value="2">2 Stars</MenuItem>
                  <MenuItem value="1">1 Star</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="sort-order-label">
                  <SortIcon sx={{ marginRight: 1, verticalAlign: 'middle' }} />
                  Sort Order
                </InputLabel>
                <Select
                  labelId="sort-order-label"
                  value={sortOrder}
                  label="Sort Order"
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <MenuItem value="desc">Newest First</MenuItem>
                  <MenuItem value="asc">Oldest First</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* Feedback List */}
        {loading ? (
          <Grid container spacing={3}>
            {[...Array(6)].map((_, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
                <Skeleton variant="text" sx={{ marginTop: 2 }} />
                <Skeleton variant="text" width="60%" />
              </Grid>
            ))}
          </Grid>
        ) : (
          <>
            <Grid container spacing={3}>
              {paginatedFeedbacks.length > 0 ? (
                paginatedFeedbacks.map((feedback) => (
                  <Grid item xs={12} md={6} lg={4} key={feedback._id}>
                    <FeedbackCard feedback={feedback} admin />
                  </Grid>
                ))
              ) : (
                <Typography variant="h6" align="center" sx={{ width: '100%', marginTop: 4 }}>
                  No feedbacks found.
                </Typography>
              )}
            </Grid>

            {/* Pagination */}
            {feedbacks.length > itemsPerPage && (
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                <Pagination
                  count={Math.ceil(feedbacks.length / itemsPerPage)}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                />
              </Box>
            )}
          </>
        )}

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
