const Restaurants = require('../data/Restaurant')
const common = require('./common')
const {idAlreadyInUse} = common 

//methods used to help interact with restaurant data

    //method that verifies that all props are filled with things
const verifierData = ({id,name,direction,horario,tipoRestaurante,telefono}) => {
    let verified = false
    typeof(id) === 'number' ? verified = true : verified = false
    typeof(name) === 'string' ? verified = true : verified = false
    typeof(direction) === 'string' ? verified = true : verified = false
    typeof(horario) === 'string' ? verified = true : verified = false
    typeof(tipoRestaurante) === 'string' ? verified = true : verified = false
    typeof(telefono) === 'number' ? verified = true : verified = false
    return verified
}

    //maybe redundant
const verifyIdRestaurant = (id) => {
    let verified = false
    for(e of Restaurants){
        if(e.id === id) verified = true
    }
    return verified
}

const DataRestaurants = {
    verifyIdRestaurant,
    allRestaurants : () => {
        return Restaurants
    },
    restaurantById : (id) => {
        const res = undefined
        if(typeof(id) === 'number'){
        if(idAlreadyInUse(id, Restaurants)){res = Restaurants.find()}
        }
    return res
    },
    addRestaurant : (newRestaurant) => {
        let done
        if(verifierData(newRestaurant)){
            if(!idAlreadyInUse(newRestaurant.id, Users)) Users.push(newRestaurant)
            done = true;
        }else {
            done = false
        }
        return done
    },
    modifyRestaurant : (RestaurantModified) => {
        //with all the data changed with the exeption of the id
        let done
        if(verifierData(RestaurantModified)){
            let user = userById(RestaurantModified.id)
            user.name = RestaurantModified.name
            user.direction = RestaurantModified.direction
            user.horario = RestaurantModified.horario
            user.tipoRestaurante = RestaurantModified.tipoRestaurante
            user.telefono = RestaurantModified.telefono
            done = true
        }else{done = false}
        return done
    },
    deleteRestaurant : (id) => {
        const res = undefined
        if(typeof(id) === 'number' && idAlreadyInUse(id, Users)){
            res = Restaurants.pop()
        }
        return res
    },

}
module.exports = DataRestaurants;