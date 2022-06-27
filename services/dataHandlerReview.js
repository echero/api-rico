const Restaurants = require('../data/Restaurant')
const Users = require('../data/User')
const Reviews = require('../data/review')
const common = require('./common')
const {idAlreadyInUse} = common

//methods used to help interact with review data

    //method that verifies that all props are filled with things
const verifierData = ({id, idUser, idRestaurant,score, comment}) => {
    let verified = false
    typeof(id) === 'number' ? verified = true : verified = false
    typeof(idUser) === 'number' ? verified = true : verified = false
    typeof(idRestaurant) === 'number' ? verified = true : verified = false
    typeof(score) === 'number' && score <= 5 ? verified = true : verified = false
    typeof(comment) === 'string' ? verified = true : verified = false
    return verified
}

const reviewById = (id) => {
    let res = {}
    if(typeof(id) === 'number'){
        if(idAlreadyInUse(id, Reviews)){
            res = Reviews.find(e => e.id === id)
        }
    }
    return res
}

const newID = () => {
    let largest = 0;
    for (let i=0; i<Reviews.length; i++){
        if(Reviews[i].id > largest){
        largest = Reviews[i].id	
        }
    }
    return largest + 1
}

const deepVerifierData = ({id, idUser, idRestaurant,score, comment}) => {
    let verified = false
    verified = verifierData({id, idUser, idRestaurant,score, comment})
    idAlreadyInUse(idUser, Users) ? verified = true : verified = false
    idAlreadyInUse(idRestaurant, Restaurants) ? verified = true : verified = false
    return verified
}


const DataReview = {
    deepVerifierData,
    newID,
    reviewById,
    allReviews : () => {
        return Reviews
    },
    reviewsByUser : (idUser) => {
        let res = []
        if(typeof(idUser) === 'number'){
            if(idAlreadyInUse(idUser, Users)){
                res = Reviews.filter(e => e.idUser === idUser)
            }
        }
        return res
    },
    reviewsByRestaurant : (idRestaurant) => {
        let res = []
        if(typeof(idRestaurant) === 'number'){
            if(idAlreadyInUse(idRestaurant, Restaurants)){
                res = Reviews.filter(e => e.idRestaurant === idRestaurant)
            }
        }
        return res
    },
    addReview : (newReview) => {
        let done
        if(verifierData(newReview)){
            if(!idAlreadyInUse(newReview.id, Reviews)){
                if(idAlreadyInUse(newReview.idRestaurant, Restaurants) && idAlreadyInUse(newReview.idUser, Users)){
                    Reviews.push(newReview)
                }
            }
            done = true;
        }else {
            done = false
        }
        return done
    },
    deleteReview : (id) => {
        let done = false
        if(typeof(id) === 'number' && idAlreadyInUse(id, Reviews)){
            const index = Reviews.indexOf(reviewById(id))
            if(index !== -1){
                Reviews.splice(index, 1)
                done = true
            }
        }
        return done
    }
}

module.exports = DataReview;