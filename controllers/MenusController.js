const Menus = require('../data/Menus')
const Restaurants = require('../data/Restaurant')
const Menu = require('../models/menu')
const Plate = require('../models/plate')
const { idAlreadyInUse } = require('../services/common')
const handlerMenu = require('../services/dataHandlerMenu')
const { MenuById, allMenus, PlateById, deleteMenu, addMenu, addPlate} = handlerMenu
// const numRegex = /^\d+$/;
//numRegex.test()

module.exports = {
    //done [✔]
    get : (req, res) => {
        //'trae todos los menus con sus platos'
        res.status(200)
        res.json(allMenus())
    },
    //done [✔]
    id : (req, res) => {
        //'trae un menu segun id'
        const id = parseInt(req.params.id)
        let menu = MenuById(id)
        if(Object.entries(menu).length !== 0){
            res.status(200)
            res.json(MenuById(id))
        }else{
            //'trae error si no encuentra ese menu'
            res.status(404)
            res.json({ message: 'there are no menus with that id'})
        }
    },
    //done [✔]
    idPlates : (req, res) => {
        const id = parseInt(req.params.id)
        let menu = MenuById(id)
        if(Object.entries(menu).length !== 0){
            if(menu.plates.length === 0){
                //'trae error si no tiene platos en el menu'
                res.status(404)
                res.json({ message: "there are no plates in this menu"})
            }else{
                //'trae los platos de un menu segun id'
                res.status(200)
                res.json(menu.plates)
            }
        }else{
            //'trae error si no encuentra ese menu'
            res.status(404)
            res.json({ message: 'there are no menus with that id'})
        }
    },
    //done [✔]
    idPlate : (req, res) => {
        const id = parseInt(req.params.id)
        const id2 = parseInt(req.params.id2)
        let menu = MenuById(id)
        let plate
        if(Object.entries(menu).length !== 0){
            if(menu.plates.length === 0){
                //'trae error si no tiene platos en el menu'
                res.status(404)
                res.json({ message: "there are no plates in this menu"})
            }else{
                plate = PlateById(id2, id)
                if(Object.entries(plate).length !== 0){
                    //'trae el plato segun el id del menu y del plato'
                    res.status(200)
                    res.json(plate)
                }else{
                    //'trae error si no encuentra el plato'
                    res.status(404)
                    res.json({ message: 'there are no plates with that id'})
                }
            }
        }else{
            //'trae error si encuentra ese menu'
            res.status(404)
            res.json({ message: 'there are no menus with that id'})
        }
    },
    //done [✔]
    post : (req, res) => {
        const body = req.body
        if(body.hasOwnProperty('id') && body.hasOwnProperty('idRestaurant') && body.hasOwnProperty('plates') ){
            let arr = []
            for(let i=0;i < body.plates.length;i++){
                const e = new Plate (body.plates[i].id, body.plates[i].name, body.plates[i].price)
                arr.push(e)
            }
            const newMenu = new Menu(body.id, body.idRestaurant, arr)

            if(idAlreadyInUse(body.id, Menus)){
                //'trae error si el id del menu no es valida'
                res.status(404)
                res.json({ message: 'there are already menus with that id'})
            }else{
                if(!idAlreadyInUse(body.idRestaurant, Restaurants)){
                    //'trae error is el id del restaurant no es valida'
                    res.status(404)
                    res.json({ message: 'there are no restaurants with that id'})
                }else{
                    if(addMenu(newMenu)){
                        //'agrega el menu'
                        res.status(201)
                        res.json({ message: 'menu added'})
                    }else{
                        //'trae error si los datos del menu nuevo no están bien'
                        res.status(404)
                        res.json({ message: 'the menu data provided is not valid'})
                    }
                }
            }   
                
        }
    },
    postPlate : (req, res) => {
        const id = parseInt(req.params.id)
        const body = req.body
        const menu = MenuById(id)
        if(body.hasOwnProperty("id") && body.hasOwnProperty('name') && body.hasOwnProperty('price')){
            const plate = new Plate (body.id, body.name, body.price)
            if(Object.entries(menu).length !== 0){
                if(addPlate(menu.id,plate)){
                    //'agrega el plato al menu'
                    res.status(201)
                    res.json(`plate added to the menu ${req.params.id}`)
                }else{
                    //'trae error si los datos del plato nuevo no está bien'
                    res.status(404)
                    res.json({ message: 'the plate data provided is not valid'})
                }
            }else{
                //'trae error si no encuentra el menu del plato a agregar'
                res.status(404)
                res.json({ message: 'there are no menus with that id'})
            }
        }else{
            //'trae error si los datos del plato nuevo no está bien'
            res.status(404)
            res.json({ message: 'the plate data provided is not valid'})
        }
    },
    //done [✔]
    delete : (req, res) => {
        id = parseInt(req.params.id)
        if(idAlreadyInUse(id, Menus)){
            deleteMenu(id)
            res.status(201)
            res.json(`menu ${id} deleted`)
        }else{
            'trae error si el id del menu no es valida'
            res.status(404)
            res.json({ message: 'there are no menus with that id'})
        }
    },
    //done [✔]
    deletePlate : (req, res) => {
        let id, id2
        id = parseInt(req.params.id)
        id2 = parseInt(req.params.id2)
        let r = handlerMenu.deletePlate(id2, id)
        if(r){
            res.status(201)
            res.json(`plate ${id2} deleted from the menu ${id}`)
        }else{
            res.status(404)
            res.json('error')
        }
    },
    //done [✔]
    deletePlates : (req, res) => {
        let id = parseInt(req.params.id)
        let r = handlerMenu.deletePlates(id)
        if(r){
            res.status(201)
            res.json(`plates deleted from menu ${id}`)
        }else{
            res.status(404)
            res.json('error')
        }
    }
}
