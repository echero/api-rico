const Review = require('../models/review')

const Reviewes = [
   new Review (1, 1, 2, 4, "Muy rico"),
   new Review (2, 2, 2, 1, "Esperaba algo mejor"),
   new Review (3, 3, 3, 3, "Estuvo bien pero no volveria"),
   new Review (4, 3, 3, 3, "podria ser mejor"),
   new Review (5, 4, 2, 5, "genial!!"),
   new Review (6, 1, 1, 5, "increible!"),
   new Review (7, 2, 1, 2, "horrible!")
]

module.exports = Reviewes;