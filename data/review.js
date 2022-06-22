const Review = require('../models/review')

const Reviewes = [
   new Review (1, 100, 150, 4, "Muy rico"),
   new Review (2, 200, 250, 1, "Esperaba algo mejor"),
   new Review (3, 300, 350, 3, "Estuvo bien pero no volveria")
]

module.exports = Reviewes;