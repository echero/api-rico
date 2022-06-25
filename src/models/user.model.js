const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
