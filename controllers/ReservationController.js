const reservation = require('../models/reservation')
const reservationData = require('../data/Reservation')
const handlerRestaurant = require('../services/dataHandlerRestaurant');

module.exports = {
    get : (req, res) => {
        // res.status(200)
        // res.json(reservationData)
        //probar si funciona
        const reservations = reservation.find();
    return res.status(200).json(reservations);
    },
    getRestaurantById: (req, res) => {
        //probar
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
        //const { aqui van los datos del modelo que usamos } = req.body;
    
        try {
          const newReservation = new Reservation({ DATOS });
         //const insertReservation = guardarlo en el array de data
          return res.status(201).json('insertReservation');
        } catch (e) {
          return res.status(500).json({
            error: true,
            message: 'Error al guardar la reserva',
          });
        }
      },
       //Regla de negocio
  remove: async (req, res) => {
    //probar si funciona
    const { id } = req.params;
    //no se puede cancelar una reserva el mismo dia de dicha reserva
    const deletedReservation = await Reservation.findByIdAndDelete(id);
    const date = Date.now
    if(deletedReservation.date !== date){
      return res.status(200).json(deletedReservation);
    }
    return res.status(400).json({message: "No puedes cancelar el mismo día de la reserva"})
  },
  update: (req, res) => {
    //solo se puede actualizar el dia y la hora
    const { id } = req.params;
    //const { datos que usamos } = req.body;

    //const data = {'datos que usamos' };

    // Reservation.updateOne({ id }, data); // actualizacion
    const updatedReservation = Reservation.findById(id);
    return res.status(200).json(updatedReservation);
  },
}