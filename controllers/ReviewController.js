const review = require('../models/review')
const Review = require('../models/review')
const dataHandlerReview = require('../services/dataHandlerReview')
const { allReviews, reviewById, newID, addReview, deleteReview} = dataHandlerReview

module.exports = {
    get : (req, res) => {
        res.status(200)
        res.json(allReviews())
    },
    id : (req, res) => {
        //'trae una review segun id'
        let id = parseInt(req.params.id)
        let review = reviewById(id)
        if(Object.entries(review).length !== 0){
            res.status(200)
            res.json(review)
        }else{
            //'trae error si no tiene una review con ese id'
            res.status(404)
            res.json({message: 'There are no reviews with that id'})
        }
    },
    post : (req, res) => {
        const body = req.body
        let newReview = {}
        if(body.hasOwnProperty('idUser') && body.hasOwnProperty('idRestaurant') && body.hasOwnProperty('score') && body.hasOwnProperty('comment') ){
            newReview = new Review(newID(), body.idUser, body.idRestaurant, body.score, body.comment)
        }
        if(Object.entries(newReview).length !== 0 && dataHandlerReview.deepVerifierData(newReview)){
            //'crea una review con datos validos'
            if(addReview(newReview)){
                res.status(201)
                res.json({message: 'review added succesfully'})
            }
        }else{
            //'da error por datos invalidos'
            res.status(404)
            res.json({message: 'error - data provided was not valid'})
        }
    },
    delete : (req, res) => {
        const id = parseInt(req.params.id)
        let review = reviewById(id)
        if(Object.entries(review).length !== 0){
            //'elimina la review correctamente
            if(deleteReview(review.id)){
                res.status(201)
                res.json(`review ${id} deleted`)
            }else{
                res.status(404)
                res.json({message: "There has been an error"})
            }
        }else{
            //'da error por no encontrar la review'
            res.status(404)
            res.json({message: "There are no reviews with that id"})
        }
    }
}