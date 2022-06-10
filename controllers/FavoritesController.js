const restaurants = require('../data/Restaurant')
const handlerUser = requier('../services/dataHandlerUser')

module.exports = {

    get : (req, res) => {
        res.json(users.allUsersFavorites)
    },
    id : (req, res) => {
        const userfavorites = handlerUsers.favoritesByUser(req.params.id)
        if(typeof(userfavorites) !== 'undefined'){
            res.json(userfavorites)
        }else{
            res.status(404).end()
        }
    },
    post : (req, res) => {
        // const body = req.params

    },
    delete : ()  => {

    }

}