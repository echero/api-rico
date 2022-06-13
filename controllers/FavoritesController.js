const { idAlreadyInUse } = require('../services/common')
const handlerUser = require('../services/dataHandlerUser')
const handlerRestaurant = require('../services/dataHandlerRestaurant')
const Users = require('../data/User')
// const numRegex = /^\d+$/;

module.exports = {
    //get
    //trae todos los usuarios con sus nombres y favoritos
    get : (req, res) => {
        res.status(200)
        res.json(handlerUser.allUsersFavorites())
    },
    //get :id
    id : (req, res) => {
        let id 
        try{
            id = parseInt(req.params.id)
        }catch(e){            
            //trae error en el caso de que no pueda parsear el id
            res.status(404)
            res.json({ message: 'The id passed is not valid'})
        }
        const userfavorites = handlerUser.favoritesByUser(id)
        if(Object.entries(userfavorites).length !== 0){
            //https://attacomsian.com/blog/check-if-javascript-object-is-empty
            if(userfavorites.favorites.length === 0){
                    //trae error si no tiene favoritos el usuario
                res.status(404)
                res.json({ message: "There are no favorites for this user"})
            }else{
            //trae favoritos del usuario
            res.status(200)
            res.json(userfavorites)
            }
        }else{
            if(Object.entries(handlerUser.userById(id)).length === 0){
                //trae error si no existe ese usuario
                res.status(404)
                res.json({ message: "There are no users with that id"})
            }
        }
    },
    //post
    post : (req, res) => {
        let id = parseInt(req.params.id)
        let body = req.body
        let fav
        if(body.hasOwnProperty('favorites')){
            fav = req.body.favorites
            if(handlerUser.verifyFavAll(fav)){
                if(idAlreadyInUse(id, Users)){
                    handlerUser.addFavoriteToUser(id, fav)
                        //'agrega favoritos al usuario'
                        res.status(201)
                        res.json({message: 'Favorites list updated'})
                    }else{
                        //'da un error al no encontrar tal usuario'
                        res.status(404)
                        res.json({ message: "The user id is not valid or the user does't exist"})
                    }
                }else{
                    //'da un error al no encontrar restaurants con las id recibidas'
                    res.status(404)
                    res.json({message: "the restaurants weren't found, some or all of the id's provided may not be from restaurants in the database"})
                }
        }
    },
    //delete
    delete : (req, res)  => {
        let id = parseInt(req.params.id)
        let body = req.body
        let toErrase
        if(body.hasOwnProperty('id_restaurant')){
            toErrase = req.body.id_restaurant
            //added
            if(Object.entries(handlerUser.userById(id)).length === 0){
                //da error por no encontrar el usuario
                res.status(404)
                res.json({ message: "There are no users with that id"})
            }else{
                if(handlerRestaurant.verifyIdRestaurant(toErrase)){
                    //elimina un favorito del usuario
                    handlerUser.removeFavorite(id, toErrase)
                    res.status(201)
                    res.json({ message: "Favorite deleted from the users list"})

                }else{
                    //da error por no encontrar el favorito a eliminar
                    res.status(404)
                    res.json({ message: "the favorite restaurant wasn't found"})
                }
            }
        }
    }

}