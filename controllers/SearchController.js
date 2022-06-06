// let restaurants = [
//   {
//     name: "Avenida Rivadavia 3439",
//     direction: "El Pobre Luis",
//     horario: "08am-22pm",
//     tipoRestaurante: "Parrilla",
//     telefono: 3232232,
//   },
//   {
//     name: "Güerrín",
//     direction: "Corrientes 1368",
//     horario: "9am-23pm",
//     tipoRestaurante: "Pizza",
//     telefono: 8565446,
//   },
//   {
//     name: "La Pescadorita",
//     direction: "Humboldt 1905",
//     horario: "9am-23pm",
//     tipoRestaurante: "Mariscos",
//     telefono: 798778,
//   },
//   {
//     name: "La Parolaccia",
//     direction: "Alicia Moureau de Justo 1052",
//     horario: "10am-02am",
//     tipoRestaurante: "Pastas",
//     telefono: 356546,
//   },
// ];
const restaurants = require('../Data/index')

module.exports = {
  get: async (req, res) => {
      
    const query = req.query.q.toLowerCase();
    const filtered = restaurants.filter(r => { 
      const name = r.name.toLowerCase()
      //retorno sí el nombre del restaurant convertido en minuscula  
      //contiene la palabra que recibo por query string
      return name.includes(query)
    })

    if(filtered.length === 0){
      return res.status(404).json({message: "No hay resultados"})
    }
    return res.json(filtered);
  },
};
