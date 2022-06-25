const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  hour: {
    type: Number,
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

const Reservation = mongoose.model('Reservation', ReservationSchema);

module.exports = { Reservation };
