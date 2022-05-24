let registers = [
    {
        "id": 8,
        "conten": "Restaurant",
        "Direccion": "Barridoff",
        "Estado" : true
    },
    {
        "id": 18,
        "conten": "Persona",
        "Direccion": "Clemente jose 4563",
        "Estado" : true 
    }
    
]

module.exports = {
    get : (req, res) => {
        res.json(registers)
    },

    id : (req, res) => {
        const id = Number(req.params.id)
        const register = registers.find(register => register.id === id)
        if(register){
            res.json(register)
        }
        else{
            res.status(404).end()
            console.log("sale por falso")
        }
    }
}