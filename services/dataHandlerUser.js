const Users = require('../data/User')
const handlerRestaurant = require('./dataHandlerRestaurant')
const common = require('./common')
const { idAlreadyInUse } = common
const { verifyIdRestaurant } = handlerRestaurant

// //methods used to help interact with users data

//     //method that verifies that all props are filled with things
// const verifierData = ({id, name, surname, age, state, favorites}) => {
//     let verified = false
//     typeof(id) === 'number' ? verified = true : verified = false
//     typeof(name) === 'string' ? verified = true : verified = false
//     typeof(surname) === 'string' ? verified = true : verified = false
//     typeof(age) === 'number' ? verified = true : verified = false
//     typeof(state) === 'boolean' ? verified = true : verified = false
//     typeof(favorites) === 'object' ? verified = true : verified = false
//     return verified
// }
    //returns true or false depending if the array only includes numbers
const verifyDataFav = (arr) => {
    //in this case the favorites are only an array with the ids of the restaurants
    return arr.every(e => {return typeof e === 'number'})
}
    //assuming all ids in the array are numbers verifies that they are of real id of restaurants
const verifyFavAll = (arr) => {
    // verifyIdRestaurant
    return arr.every(e => verifyIdRestaurant(e))
}
//***************************************************************** */
const userById = (id) => {
    let res = {}
    if(typeof(id) === 'number'){
        if(idAlreadyInUse(id, Users)){
            res = Users.find(e => e.id === id)
        }
    }
return res
}
const favoritesByUser = (id) => {
    let userAndFavs = {}
    let user = userById(id)
    if(Object.entries(user).length !== 0){
    const {id, name, favorites} =  user
    userAndFavs = {id, name, favorites}
    }
    return userAndFavs
}
const allUsersFavorites = () => {
        const usersAndFavs = []
        for(const user of Users){
            usersAndFavs.push(favoritesByUser(user.id))
        }
        return usersAndFavs
}
//hasta aquí
const addUser = (newUser) => {
    let done
    if(verifierData(newUser)){
        if(!idAlreadyInUse(newUser.id, Users)) Users.push(newUser)
        done = true;
    }else {
        done = false
    }
    return done
}
const modifyUser = (userModified) => {
    //with all the data changed with the exeption of the id
    let done
    if(verifierData(userModified)){
        let user = userById(userModified.id)
        user.name = userModified.name
        user.surname = userModified.surname
        user.age = userModified.age
        user.state = userModified.state
        user.favorites = userModified.favorites
        done = true
    }else{done = false}
    return done
}
const deleteUser = (id) => {
    const res = undefined
    if(typeof(id) === 'number' && idAlreadyInUse(id, Users)){
        res = Users.pop()
    }
    return res
}

const addFavoriteToUser = (id, arrayFavs)=> {
    let done = false
    if(typeof(id) === 'number' && idAlreadyInUse(id, Users)){
        if(verifyDataFav(arrayFavs)){
            if(verifyFavAll(arrayFavs)){
                const user = userById(id)
                user.favorites = common.ignoreDoubleData(user.favorites, arrayFavs)
                done = true
            }
        }
    }
    return done
}
const removeAllFavorites = (id)=>{
    let done = false
    const user = this.userById(id)
    if(typeof(user) !== 'undefined'){
        done = true
        user.favorites = []
    }
    return done
}
const removeFavorite = (id, idFav) => {
    let done = false
    const user = this.userById(id)
    if(typeof(user) !== 'undefined'){
        if(verifyIdRestaurant(idFav)){
            user.favorites.push(idFav)
            done = true
        }
    }
    return done
}

// //all the methods to interact with the data
const DataUsers = {
    allUsers : () => {
        return Users
    },
    userById,
    favoritesByUser,
    allUsersFavorites,
    addUser,
    modifyUser,
    // modifyUserName,
    // modifyUserSurname,
    // modifyUserAge,
    // modifyUserState,
    deleteUser,
    addFavoriteToUser,
    verifyFavAll,
    verifyDataFav,
    removeAllFavorites,
    removeFavorite

}
module.exports = DataUsers;