import React, { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { submitFeedback } from '../API/feedbackApi';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  TextField, 
  Select, 
  MenuItem, 
  Button, 
  InputLabel, 
  FormControl 
} from '@mui/material';

const SubmitFeedback = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    text: '',
    rating: 5,
    image: null
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = new FormData();
      dataToSend.append('text', formData.text);
      dataToSend.append('rating', formData.rating);
      if (formData.image) dataToSend.append('image', formData.image);

      await submitFeedback(dataToSend, user.token);
      navigate('/');
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Submit Your Feedback
        </Typography>
        <Box component="form" onSubmit={handleSubmit} encType="multipart/form-data">
          <TextField
            name="text"
            label="Your Feedback"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={formData.text}
            onChange={handleChange}
            required
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="rating-label">Rating</InputLabel>
            <Select
              labelId="rating-label"
              name="rating"
              value={formData.rating}
              label="Rating"
              onChange={handleChange}
            >
              {[5, 4, 3, 2, 1].map(r => (
                <MenuItem key={r} value={r}>
                  {r} Star{r > 1 && 's'}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Upload Image
            <input
              type="file"
              hidden
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 3 }}
          >
            Submit Feedback
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SubmitFeedback;
