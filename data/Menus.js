const Menu = require('../models/menu')
const Plate = require('../models/plate')

const plates = [
    new Plate (1,'choriso', 500),
    new Plate (2,'morcilla', 800),
    new Plate (3,'tacos de cerdo',700),
    new Plate (4,'Costillas BBQ',900),
    //
    new Plate (5,'Pizza Napolitana', 480),
    new Plate (6,'Pizza de mozzarella', 700),
    new Plate (7,'Pizza Hawaiana',500),
    new Plate (8,'Pizza de Pepperoni',300),
    new Plate (9,'Pizza Prosciutto',660),
    //
    new Plate (10,'Ceviche de pescado', 840),
    new Plate (11,'Paella valenciana', 1240),
    new Plate (12,'Merluza al vapor con verduras', 890),
    new Plate (13,'salmon rosado', 2000),
]


const Menus = [
    //new Menu (id, idRestaurant, plates),
    new Menu (1,1,[plates[0],plates[1],plates[2],plates[3]]),
    new Menu (2,2,[plates[4],plates[5],plates[6],plates[7],plates[8]]),
    new Menu (3,3,[plates[9],plates[10],plates[11],plates[12]]),
    new Menu (4,1,[])
]
module.exports = Menus;