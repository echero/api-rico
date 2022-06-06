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
