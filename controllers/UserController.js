let users = [
    {
        "id": 1,
        "Nombre": "Ezequiel",
        "Apellido": "Cherone",
        "Edad" : 34,
        "Estado" : true
    },
    {
        "id": 2,
        "Nombre": "Javier",
        "Apellido": "Cherone",
        "Edad" : 39,
        "Estado" : true 
    }
    
]

module.exports = {
    get : (req, res) => {
        res.json(users)
    },
    id : (req, res) => {
        const id = Number(req.params.id)
        const user = users.find(user => user.id === id)
        if(user){
            res.json(user)
        }
        else{
            res.status(404).end()
        }
    } 
}