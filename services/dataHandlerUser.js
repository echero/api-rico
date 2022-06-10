const Users = require('../data/User')
const User = require('../models/user')
const Restaurants = require('../data/Restaurant')
const e = require('express')

//methods used to help interact with users data
const idAlreadyInUse = (id) => {
    //search if the id is in use
    const finded = Users.find(u => u.id === id)
    if(finded){
        // throw new Error(`ya hay otro usuario con el mismo id: (${id})`)
        return true
    }else{
        return false
    }
}
    //method that verifies that all props are filled with things
const verifierData = ({id, name, surname, age, state, favorites}) => {
    let verified = false
    typeof(id) === 'number' ? verified = true : verified = false
    typeof(name) === 'string' ? verified = true : verified = false
    typeof(surname) === 'string' ? verified = true : verified = false
    typeof(age) === 'number' ? verified = true : verified = false
    typeof(state) === 'boolean' ? verified = true : verified = false
    typeof(favorites) === 'object' ? verified = true : verified = false
    return verified
}
    //unifies 2 arrays into 1 without the duplicates
const ignoreDoubleData = (arr1, arr2) => {    
    const part2 = arr2.filter(a => !arr1.includes(a))
    const result = arr1.concat(part2);
    return result
}
    //returns true or false depending if the array only includes numbers
const verifyDataFav = (arr) => {
    //in this case the favorites are only an array with the ids of the restaurants
    return arr.every(e => {return typeof e === 'number'})
}
    //verifies if the id of the restaurant is valid or not
const verifyIdRestaurant = (id) => {
    let verified = false
    for(e of Restaurants){
        if(e.id === id) verified = true
    }
    return verified
}


//all the methods to interact with the data
const DataUsers = {
    allUsers : () => {
        return Users
    },
    userById : (id) => {
        const res = undefined
        if(typeof(id) === 'number'){
        if(idAlreadyInUse(id)){res = Users.find()}
        }
    return res
    },
    favoritesByUser : (id) => {
        const userAndFavs = undefined
        if(typeof(id) === 'number' && idAlreadyInUse(id)){
        const user = Users.find(user => user.id === id)
        const {id, name, favorites} =  user
        userAndFavs = {id, name, favorites}
        }
        return userAndFavs
    },
    allUsersFavorites : () => {
        const usersAndFavs = []
        for(const user of Users){
            usersAndFavs.push(favoritesByUser(user.id))
        }
        return usersAndFavs
    },
    addUser : (newUser) => {
        let done
        if(verifierData(newUser)){
            if(!idAlreadyInUse(newUser.id)) Users.push(newUser)
            done = true;
        }else {
            done = false
        }
        return done
    },
    modifyUser : (userModified) => {
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
    },
    // modifyUserName,
    // modifyUserSurname,
    // modifyUserAge,
    // modifyUserState,
    addFavoriteToUser: (id, arrayFavs)=> {
        let done = false
        if(typeof(id) === 'number' && idAlreadyInUse(id)){
            if(verifyDataFav(arrayFavs)){
                const user = userById(id)
                user.favorites = ignoreDoubleData(user.favorites, arrayFavs)
                done = true
            }
        }
        return done
    },
    removeAllFavorites : (id)=>{
        let done = false
        const user = this.userById(id)
        if(typeof(user) !== 'undefined'){
            done = true
            user.favorites = []
        }
        return done
    },
    removeFavorite : (id, idFav) => {
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

}
module.exports = DataUsers;