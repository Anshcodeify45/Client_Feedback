const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const {
  createFeedback,
  getAllFeedback,
  addComment
} = require('../controllers/feedbackController');

// Upload setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.post('/', protect(), upload.single('image'), createFeedback);
router.get('/', protect(['admin']), getAllFeedback);
router.put('/:id/comment', protect(['admin']), addComment);

module.exports = router;
