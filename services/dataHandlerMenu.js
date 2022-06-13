const Menus = require('../data/Menus')
const plate = require('../models/plate')
const common = require('./common')
const {idAlreadyInUse} = common
const handlerRestaurant = require('./dataHandlerRestaurant')

//methods used to help interact with restaurant data

    //methods that verifies that all props are filled with valid things
const verifierDataPlate = ({id,name,price}) => {
    let verified = false
    typeof(id) === 'number' ? verified = true : verified = false
    typeof(name) === 'string' ? verified = true : verified = false
    typeof(price) === 'number' ? verified = true : verified = false
    return verified
}

const verifierIdPlates = (menu, arr) => {
    let done = false
    if(!arr.every(e => idAlreadyInUse(e.id, menu.plates)))done = true
    return done
}

const verifyAllPlates = (arr) => {
    return arr.every(e => verifierDataPlate(e))
}
const verifierDataMenu = ({id,idRestaurant,plates}) => {
    let verified = false
    typeof(id) === 'number' ? verified = true : verified = false
    typeof(idRestaurant) === 'number' ? verified = true : verified = false
    verifyAllPlates(plates) ? verified = true : verified = false
    return verified
}
// [{ id: 1, name: 'Pizza Napolitana', price: 480 },{ id: 2, name: 'Pizza Napolitana', price: 480 },{ id: 3, name: 'Pizza Napolitana', price: 480 }]
    //
const MenuById = (id) => {
    let res = {}
    if(typeof(id) === 'number'){
        if(idAlreadyInUse(id, Menus)){
            res = Menus.find(e => e.id === id)
        }
    }
return res
}
const PlateById = (id, idM) => {
    let res = {}
    let menu = MenuById(idM)
    if(Object.entries(menu).length !== 0){
        if(typeof(id) === 'number'){
            if(idAlreadyInUse(id, menu.plates)){
                res = menu.plates.find(e => e.id === id)
            }
        }
    }
return res
} 
    //

const addMenu = (newMenu) => {
    let done
    if(verifierDataMenu(newMenu)){
        if(!idAlreadyInUse(newMenu.id, Menus)) Menus.push(newMenu)
        done = true;
    }else {
        done = false
    }
    return done
}
const modifyMenu = (menuModified) => {
    //with all the data changed with the exeption of the id's
    let done
    if(verifierDataMenu(menuModified)){
        let menu = MenuById(menuModified.id)
        if(verifierIdPlates(menu.id, menuModified.plates))
        menu.plates = menuModified.plates
        done = true
    }else{done = false}
    return done
}
const deleteMenu = (id) => {
    let done = false
    if(typeof(id) === 'number' && idAlreadyInUse(id, Menus)){
        const menu = MenuById(id)
        const index = Menus.indexOf(menu)
        if(index !== -1){
            Menus.splice(index,1)
            done = true
        }
    }
    return done
}
// estos funcionan
const deletePlate = (id, idM) => {
    let done = false
    if(typeof(idM) === 'number' && idAlreadyInUse(idM, Menus)){
        const menu = MenuById(idM)
        if(menu.plates.length !== 0){
            if(typeof(id) === 'number' && idAlreadyInUse(id, menu.plates)){
                let plate = PlateById(id, idM)
                let index = menu.plates.indexOf(plate)
                if(index !== -1){
                    menu.plates.splice(index,1)
                    done = true
                }
            }
        }
    }
    return done
}
const deleteAllPlates = (id) => {
    let done = false
    if(typeof(id) === 'number' && idAlreadyInUse(id, Menus)){
        const menu = MenuById(id)
        menu.plates = []
        done = true
    }
    return done
}
//
const addPlate = (id, plate) => {
    let done
    if(typeof(id) === 'number' && idAlreadyInUse(id, Menus)){
        const menu = MenuById(id)
        if(!idAlreadyInUse(plate.id, menu.plates)){
            menu.plates.push(plate)
            done = true
        }
    }
    return done
}
const modifyPlate = (id, plateModified) => {
    let done
    if(typeof(id) === 'number' && idAlreadyInUse(id, Menus)){
        const menu = MenuById(id)
        if(verifierDataPlate(plateModified)){
            if(idAlreadyInUse(plateModified.id, menu.plates)){
                let plate = PlateById(plateModified.id, menu.id)
                plate.name = plateModified.name
                plate.price = plateModified.price
                done = true
            }
        }
    }
    return done
}

const DataMenus = {
    allMenus : () => {
        return Menus
    },
    MenuById,
    addMenu,
    modifyMenu,
    deleteMenu,
    //
    PlateById,
    addPlate,
    modifyPlate,
    deletePlate,
    deleteAllPlates,
    //
    verifierDataMenu
}

module.exports = DataMenus;