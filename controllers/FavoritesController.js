const restaurants = require('../data/Restaurant')
const users = require('../data/User')

module.exports = {

    get : (req, res) => {
        res.json(users.allUsersFavorites)
    },
    id : (req, res) => {
        const userfavorites = users.favoritesByUser(req.params.id)
        if(typeof(userfavorites) !== 'undefined'){
            res.json(userfavorites)
        }else{
            res.status(404).end()
        }
    },
    add: (req, res) => {

    },
    remove : () => {

    },
    delete : ()  => {

    }

}