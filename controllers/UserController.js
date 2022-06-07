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
    } 
}