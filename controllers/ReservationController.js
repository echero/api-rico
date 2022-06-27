const Reservation = require('../models/reservation')
const reservationData = require('../data/Reservation')
const handlerRestaurant = require('../services/dataHandlerRestaurant');
const dataHandlerReview = require('../services/dataHandlerReview')

module.exports = {
    get : (req, res) => {
        //probar si funciona
        // return res.status(200).json(reservations);
        // const reservations = reservationData.find();
        res.status(200)
        res.json(reservationData)
    },
    getRestaurantById: async (req, res) => {
        //probar
        // const restaurant = handlerRestaurant.restaurantById(id);
        //Trae todas las reservas por id de Restaurant
      const id = Number(req.params.id)
      const reservaPorIdRestaurant = reservationData.filter(reserv => reserv.idRestaurante === id)
      if(reservaPorIdRestaurant){
          res.status(200)
          res.json(reservaPorIdRestaurant)
      }
      else{
          res.status(404)
          res.json({ message: "there is no reservation with this id restaurant"}).end()
      }
    },
    create: (req, res) => {
      try {
        const { id, idUser, idRestaurante, dia, hora } = req.body
        const reservationNew = new Reservation(parseInt(id), parseInt(idUser), parseInt(idRestaurante), parseInt(dia), parseInt(hora))
        
        reservationData.push(reservationNew)
        res.status(200)
        res.json(reservationNew).end()
      }catch (e) {
           res.status(404)
           res.json({message: 'Error al guardar la reserva'}).end();
        }
    },
    remove: (req, res) => {
    //probar si funciona
    //const deletedReservation = await Reservation.findByIdAndDelete(parseInt(id));
    //no se puede cancelar una reserva el mismo dia de dicha reserva
    const idReserva = Number(req.params.id)
    const reservaPorId = reservationData.find(reserv => reserv.id === idReserva)
    const date = new Date().getDate()

    if(reservaPorId.dia !== date){
      const isLargeNumber = (element) => element == reservaPorId;
      const indice = reservationData.findIndex(isLargeNumber)
      reservationData.splice(indice, 1)

      res.status(200)
      res.json(reservaPorId).end();
    }else{
      res.status(400)
      res.json({message: "No puedes cancelar el mismo día de la reserva"}).end()
    }
  },
  update: async (req, res) => {
    //solo se puede actualizar el dia y la hora
    const idReserva = Number(req.params.id)
    const { dia, hora } = req.body;
    const reservaPorId = reservationData.find(reserv => reserv.id === idReserva)
    
    if(reservaPorId){
      if(Object.entries(req.body).length === 2){
        const isLargeNumber = (element) => element == reservaPorId;
        const indice = reservationData.findIndex(isLargeNumber)

        reservationData[indice].dia = dia
        reservationData[indice].hora = hora

        res.status(200)
        res.json(reservationData[indice]).end()
      }else{
        res.status(404)
        res.json({ message: "No se puedo actualizar el dia y la hora de la reserva por tener otro parametro a modificar"}).end()
      }
      
    }else{
      res.status(404)
      res.json({ message: "No se puedo actualizar el dia y la hora de esa reserva"}).end()
    }
  },
  reviews : (req, res) => {
    const id = Number(req.params.id)
    let reviews = dataHandlerReview.reviewsByRestaurant(id)
    if(reviews.length !== 0){
        res.status(200)
        res.json(reviews)
    }else{
        res.status(404)
        res.json({message: "There are no reviews for this restaurant"})
    }
}
}
