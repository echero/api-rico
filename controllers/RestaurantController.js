let restaurants = [
    {
        "id": 1,
        "conten": "Restaurant Rosa Negra",
        "Direccion": "Dardor Rocha 1500",
        "Estado" : true
    },
    {
        "id": 2,
        "conten": "Restaurant La Bisteca",
        "Direccion": "Dardor Rocha 1000",
        "Estado" : true 
    }
    
]

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