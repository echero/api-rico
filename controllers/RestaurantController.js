const Restaurant = require('../models/restaurant')
const restaurantsData = require('../data/Restaurant')
const dataHandlerReview = require('../services/dataHandlerReview')

module.exports = {
    get : (req, res) => {
        res.json(restaurantsData)
    },
    id : (req, res) => {
        const id = Number(req.params.id)
        const restaurant = restaurantsData.find(restaurant => restaurant.id === id)
        if(restaurant){
            res.json(restaurant)
        }
        else{
            res.status(404).end()
        }
    },
    reviews : (req, res) => {
        const id = Number(req.params.id)
        const restaurant = restaurantsData.find(restaurant => restaurant.id === id)
        if(restaurant){
            res.status(200)
            res.json(dataHandlerReview.reviewsByRestaurant(restaurant.id))
        }
    },
    post : (req, res) => {

        const { id, name, direction, horario, tipoRestaurante, telefono } = req.body

        const idParse = id
  
        const restaurant = new Restaurant(idParse, name, direction, horario, tipoRestaurante, telefono)

        const busqueda = restaurantsData.find(rest => rest.id === restaurant.id)

        try {
            
            if(typeof(busqueda) === 'undefined'){
                restaurantsData.push(restaurant) 
                res.status(201)
                res.json(restaurant)
            }
            else{
                res.status(404)
            }
            
          } catch(e) {
            res.status(409)
            res.json(restaurant)
          }
     },
     delete : (req, res) => {

        const id = Number(req.params.id)
        const restaurant = restaurantsData.find(user => user.id === id)

        try {
            if(restaurant){
                const isLargeNumber = (element) => element == restaurant;
                const indice = restaurantsData.findIndex(isLargeNumber)
                restaurantsData.splice(indice, 1)
                res.json(restaurant)
            }
            else{
                res.status(404).end()
            }
        } catch(e) {
            res.status(409)
            res.json(restaurant)
        }
     },
     put : async (req, res) => {

        const id = Number(req.params.id)

        const { name, direction, horario, tipoRestaurante, telefono } = req.body
        
        const restaurantNew = new User(id, direction, horario, tipoRestaurante, telefono)

        const busqueda = restaurantsData.find(rest => rest.id === restaurantNew.id)

        if(busqueda){
            const indice = restaurantsData.findIndex(isLargeNumber)
            const isLargeNumber = (element) => element == restaurantNew;

            restaurantsData[indice].name = name
            restaurantsData[indice].direction = direction
            restaurantsData[indice].horario = horario
            restaurantsData[indice].tipoRestaurante = tipoRestaurante
            restaurantsData[indice].telefono = telefono
            
            res.status(200)
            res.json(busqueda).end()
        }
        else{
            res.status(404).end()
        }

     }
}