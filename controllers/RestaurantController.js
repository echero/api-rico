const Restaurant = require('../models/restaurant')
const restaurants = require('../data/Restaurant')

module.exports = {
    get : (req, res) => {
        res.json(restaurants)
    },
    id : (req, res) => {
        const id = Number(req.params.id)
        const restaurant = restaurants.find(restaurant => restaurant.id === id)
        if(restaurant){
            res.json(restaurant)
        }
        else{
            res.status(404).end()
        }
    },
    post : (req, res) => {

        const { id, name, direction, horario, tipoRestaurante, telefono } = req.body
  
        const restaurant = new Restaurant(id, name, direction, horario, tipoRestaurante, telefono)

        const busqueda = restaurants.find(restaurant => restaurant.id === restaurant.id)

        try {
            
            if(!busqueda){
                restaurants.push(restaurant) 
                res.status(201)
                res.json(req.params)
            }
            else{
                res.status(404)
            }
            
          } catch(e) {
            res.status(409)
            res.json(restaurant)
          }
    } 
}