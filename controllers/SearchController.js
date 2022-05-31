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
    }
}