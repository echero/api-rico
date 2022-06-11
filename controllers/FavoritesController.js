const { userById, addFavoriteToUser } = require('../services/dataHandlerUser')
const handlerUser = require('../services/dataHandlerUser')

const express = require('express');


module.exports = {
    //get
    //trae todos los usuarios con sus nombres y favoritos
    get : (req, res) => {
        res.status(200)
        res.json(handlerUser.allUsersFavorites)
    },
    //get :id
    id : (req, res) => {
        const userfavorites = handlerUser.favoritesByUser(req.params.id)
        if(typeof(userfavorites) !== 'undefined'){
            if(userfavorites.favorites.length === 0){
                //trae error si no tiene favoritos el usuario
                res.status(404)
                res.json({ message: "There are no favorites for this user"})
            }
            //trae favoritos del usuario
            res.status(200)
            res.json(userfavorites)
        }else{
            if(typeof(userfavorites) === 'number'){
                if(typeof(userById(req.params.id)) === 'undefined'){
                    //trae error si no existe ese usuario
                    res.status(404)
                    res.json({ message: "There are no users with that id"})
                }
            }
            //trae error si lo pasado como id no es valido
            res.status(404)
            res.json({ message: 'The id passed is not valid'})
        }
    },
    //post
    post : (req, res) => {
        const user = handlerUser.userById(req.params.id)
        if(typeof(user) !== 'undefined'){
            if (req.body.favorites.length === 0){
                //da un error por no recibir favoritos
                res.status(404)
                res.json({message: "There were no valid data in the request" })
            }
            const fav = req.body.favorites //nose si funciona
            if(handlerUser.addFavoriteToUser(fav)){
                //agrega favoritos al usuario
                res.status(201)
                res.json({message: 'Favorites list updated'})
            }
            if(!handlerUser.verifyDataFav(fav)){
                //da un error al no tener en favoritos validas id
                res.status(404)
                res.json({message: "The id's of the favourites restaurants are not valid"})
            }
            if(!handlerUser.verifyFavAll(fav)){
                //da un error al no encontrar restaurants con las id recibidas
                res.status(404)
                res.json({message: "the restaurants weren't found, some or all of the id's provided may not be from restaurants in the database"})
                
            }
        }
        //da un error al no encontrar tal usuario
        res.status(404)
        res.json({message: "The user id is not valid or the user does't exist"})
    },
    //delete
    //elimina un favorito del usuario
    //elimina todos los favoritos del usuario
    //da error por no encontrar el favorito a eliminar
    //da error por no encontrar el usuario
    delete : ()  => {
        //
    }

}