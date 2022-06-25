const { Restaurant } = require('../models/restaurant.model');

module.exports = {
  getAll: async (req, res) => {
    const restaurants = await Restaurant.find();
    return res.status(200).json(restaurants);
  },
  //moverlo a un archivo a parte para usarlo en reserva
  getById: async (req, res) => {
    const { id } = req.params;

    const restaurant = await Restaurant.findById(id);

    if (restaurant) {
      return res.json(restaurant);
    }

    return res.status(404).json({
      error: true,
      message: 'No existe el restaurante.',
    });
  },
  create: async (req, res) => {
    const { name, address, hours, type, phone } = req.body;

    try {
      const newRestaurant = new Restaurant({ name, address, hours, type, phone });
      const insertedRestaurant = await newRestaurant.save();
      return res.status(201).json(insertedRestaurant);
    } catch (e) {
      return res.status(500).json({
        error: true,
        message: 'Error al crear el restaurante.',
      });
    }
  },
  remove: async (req, res) => {
    const { id } = req.params;

    const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
    return res.status(200).json(deletedRestaurant);
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { name, address, hours, type, phone } = req.body;

    const data = { name, address, hours, type, phone };

    await Restaurant.updateOne({ id }, data);
    const updatedRestaurant = await Restaurant.findById(id);
    return res.status(200).json(updatedRestaurant);
  },
};
