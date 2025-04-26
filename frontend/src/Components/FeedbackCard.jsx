import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from '@mui/material';

const FeedbackCard = ({ feedback, admin }) => {
  return (
    <Card elevation={3} sx={{ borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      {feedback.imageUrl && (
        <CardMedia
          component="img"
          height="180"
          image={feedback.imageUrl}
          alt="Feedback Image"
          sx={{ objectFit: 'cover' }}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body1" gutterBottom>
          {feedback.text}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {feedback.rating} ⭐
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Submitted by: {feedback.user?.email}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Date: {new Date(feedback.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>

      {admin && (
        <Box sx={{ p: 2 }}>
          <Button
            component={Link}
            to={`/feedback/${feedback._id}`}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ borderRadius: 2 }}
          >
            View & Reply
          </Button>
        </Box>
      )}
    </Card>
  );
};

export default FeedbackCard;
