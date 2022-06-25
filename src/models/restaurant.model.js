const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  hours: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },

  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu',
  },
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = { Restaurant };
