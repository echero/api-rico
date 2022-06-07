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
    } 
}