const Restaurant = require('../models/restaurant')
const restaurantsData = require('../data/Restaurant')

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
    post : (req, res) => {

        const { id, name, direction, horario, tipoRestaurante, telefono } = req.body
  
        const restaurant = new Restaurant(id, name, direction, horario, tipoRestaurante, telefono)

        const busqueda = restaurantsData.find(rest => rest.id == rest.id)


        try {
            
            if(!busqueda){
                restaurantsData.push(restaurant) 
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