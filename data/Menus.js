const Menu = require('../models/menu')
const Plate = require('../models/plate')

const Menus = [
    //new Menu (id, idRestaurant, plates),
    new Menu (1,1,
        new Plate (1,'choriso', 500),
        new Plate (2,'morcilla', 800),
        new Plate (3,'tacos de cerdo',700),
        new Plate (4,'Costillas BBQ',900)
    ),
    new Menu (2,2,
        new Plate (5,'Pizza Napolitana', 480),
        new Plate (6,'Pizza de mozzarella', 700),
        new Plate (7,'Pizza Hawaiana',500),
        new Plate (8,'Pizza de Pepperoni',300),
        new Plate (9,'Pizza Prosciutto',660),
    ),
    new Menu (3,3,
        new Plate (10,'Ceviche de pescado', 840),
        new Plate (11,'Paella valenciana', 1240),
        new Plate (12,'Merluza al vapor con verduras', 890),
        new Plate (13,'salmon rosado', 2000),
    )
]
module.exports = Menus;