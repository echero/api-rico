const { Reservation } = require('../models/reservation.model');
const handlerRestaurant = require('../services/dataHandlerRestaurant');

module.exports = {
  get: (req, res) => {
    //res.status(200);
   // res.json(reservationData);
    const reservations =  Reservation.find();
    return res.status(200).json(reservations);
  },
  getRestaurantById: (req, res) => {
    const { id } = req.params;
    const restaurant = handlerRestaurant.restaurantById(id);
    if (restaurant) {
      res.json(restaurant.reservationData);
      res.status(200);
    }
    res.status(404);
    res.json({ message: 'No existe el restaurante' });
    // res.json(reservationData);
  },
  create: async (req, res) => {
    const { date, hour, restaurant, user } = req.body;

    try {
      const newReservation = new Reservation({ date, hour, restaurant, user });
      const insertedReservation = await newReservation.save();
      return res.status(201).json(insertedReservation);
    } catch (e) {
      return res.status(500).json({
        error: true,
        message: 'Error al guardar la reserva',
      });
    }
  },
  //Regla de negocio
  remove: async (req, res) => {
    const { id } = req.params;
    //no se puede cancelar una reserva el mismo dia de dicha reserva
    const deletedReservation = await Reservation.findByIdAndDelete(id);
    const date = Date.now
    if(deletedReservation.date !== date){
      return res.status(200).json(deletedReservation);
    }
    return res.status(400).json({message: "No puedes cancelar el mismo día de la reserva"})
    
  },
  update: async (req, res) => {
    //solo se puede actualizar el dia y la hora
    const { id } = req.params;
    const { date, hour, restaurant, user } = req.body;

    const data = { date, hour, restaurant, user };

    await Reservation.updateOne({ id }, data);
    const updatedReservation = await Reservation.findById(id);
    return res.status(200).json(updatedReservation);
  },
};
