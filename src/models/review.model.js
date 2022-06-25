const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },

  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = { Review };
