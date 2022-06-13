const User = require('../models/user')
const users = require('../data/User')

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
    },
    post : (req, res) => {

        const { id, name, surname, age, state, favorites } = req.body
        
        const userNew = new User(parseInt(id), name, surname, age, state, favorites)

        const busqueda = users.find(user => user.id === userNew.id)

        
        try {
            if(typeof(busqueda) === 'undefined'){
                users.push(userNew) 
                res.status(201)
                res.json(userNew)
            }
            else{
                res.status(404)
            }
        } catch(e) {
            res.status(409)
            res.json(userNew)
        }
    } 
}