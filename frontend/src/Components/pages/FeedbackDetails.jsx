import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getFeedbackById, respondToFeedback } from '../API/feedbackApi';
import { AuthContext } from '../Context/AuthContext';
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';

const FeedbackDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [feedback, setFeedback] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const { data } = await getFeedbackById(user.token, id);
      setFeedback(data);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      setSnackbar({ open: true, message: 'Failed to fetch feedback', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleRespond = async () => {
    try {
      await respondToFeedback(user.token, id, { comment });
      fetchFeedback(); // Refresh feedback
      setComment('');
      setSnackbar({ open: true, message: 'Reply submitted successfully!', severity: 'success' });
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      setSnackbar({ open: true, message: 'Failed to submit reply', severity: 'error' });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!feedback) return <div>Feedback not found.</div>;

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Card elevation={3}>
        {feedback.imageUrl && (
          <CardMedia
            component="img"
            height="200"
            image={feedback.imageUrl}
            alt="Feedback Image"
            sx={{ objectFit: 'cover' }}
          />
        )}
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Feedback Details
          </Typography>
          <Typography variant="body1" gutterBottom>
            {feedback.text}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rating: {feedback.rating} ⭐
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Submitted by: {feedback.user?.email}
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Admin Comment</Typography>
        {feedback.adminComment ? (
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            {feedback.adminComment}
          </Typography>
        ) : (
          <>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your reply..."
              variant="outlined"
              sx={{ marginTop: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleRespond}
              sx={{ marginTop: 2 }}
            >
              Submit Reply
            </Button>
          </>
        )}
      </Box>

      {/* Snackbar for Feedback Actions */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default FeedbackDetails;
