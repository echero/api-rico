const Restaurant = require('../models/restaurant')

const Restaurantes = [
  new Restaurant (1, "Avenida Rivadavia 3439", "El Pobre Luis", "08am-22pm", "Parrilla", 3232232),
  new Restaurant (2, "Güerrín", "Corrientes 1368", "9am-23pm", "Pizza", 8565446),
  new Restaurant (3, "La Pescadorita", "Humboldt 1905", "9am-23pm", "Mariscos", 798778),
  new Restaurant (4, "Paleta", "Belgrano 1800", "11am-1am", "parrilla", 448778)
]

module.exports = Restaurantes;
