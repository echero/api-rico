const { User } = require('../models/user.model');

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email, password });
      return res.status(200).json({
        // eslint-disable-next-line no-underscore-dangle
        token: user._id,
      });
    } catch (e) {
      return res.status(500).json({
        error: true,
        message: 'Datos incorrectos.',
      });
    }
  },

  register: async (req, res) => {
    const { name, mail, password } = req.body;

    try {
      const newUser = new User({ name, mail, password });
      const insertedUser = await newUser.save();
      return res.status(201).json(insertedUser);
    } catch (e) {
      return res.status(500).json({
        error: true,
        message: 'Error al crear el usuario.',
      });
    }
  },
};
