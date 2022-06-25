const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  },

  plates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plate' }],
});

const Menu = mongoose.model('Menu', MenuSchema);

module.exports = { Menu };
