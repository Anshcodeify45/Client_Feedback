const Feedback = require('../models/Feedback');
const AI_REPLY = "Thank you for your feedback! We'll get back to you soon.";

// Create feedback
exports.createFeedback = async (req, res) => {
  const { message, rating } = req.body;
  const image = req.file?.filename;
  try {
    const feedback = await Feedback.create({
      user: req.user.id,
      message,
      rating,
      image
    });
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all feedbacks (admin only)
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('user', 'name');
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin comment
exports.addComment = async (req, res) => {
  const { comment } = req.body;
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { comment },
      { new: true }
    );
    res.json({ ...feedback._doc, aiSuggestion: AI_REPLY }); // AI suggestion placeholder
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
