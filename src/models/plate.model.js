const mongoose = require('mongoose');

const PlateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },

  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu',
  },
});

const Plate = mongoose.model('Plate', PlateSchema);

module.exports = { Plate };
