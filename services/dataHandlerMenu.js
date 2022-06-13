const Menus = require('../data/Menus')
const Menu = require('../models/menu')
const common = require('./common')
const {idAlreadyInUse} = common
const handlerRestaurant = require('./dataHandlerRestaurant')

//methods used to help interact with restaurant data

//methods that verifies that all props are filled with valid things
//(id,name,price) 
const verifierDataPlate = ({id,name,price}) => {
    let verified = false
    typeof(id) === 'number' ? verified = true : verified = false
    typeof(name) === 'string' ? verified = true : verified = false
    typeof(price) === 'number' ? verified = true : verified = false
    return verified
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

const MenuById = (id) => {
    let res = {}
    if(typeof(id) === 'number'){
        if(idAlreadyInUse(id, Menus)){
            res = Menus.find(e => e.id === id)
        }
    }
return res
}

const DataMenus = {
    allMenus : () => {
        return Menus
    },
    MenuById,
    addMenu : (newMenu) => {
        let done
        if(verifierDataMenu(newMenu)){
            if(!idAlreadyInUse(newMenu.id, Menus)) Menus.push(newMenu)
            done = true;
        }else {
            done = false
        }
        return done
    },
    modifyMenu : (menuModified) => {
        //with all the data changed with the exeption of the id's
        let done
        if(verifierDataMenu(menuModified)){
            let menu = MenuById(menuModified.id)
            menu.plates = menuModified.plates
            done = true
        }else{done = false}
        return done
    },
    deleteMenu : (id) => {
        const res = undefined
        if(typeof(id) === 'number' && idAlreadyInUse(id, Menus)){
            res = Menus.pop()
        }
        return res
    }
}

module.exports = DataMenus;