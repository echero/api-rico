let restaurants = [
  {
    id: 1,
    conten: "Restaurant Rosa Negra",
    direccion: "Dardor Rocha 1500",
    estado: true,
  },
  {
    id: 2,
    conten: "Restaurant La Bisteca",
    direccion: "Dardor Rocha 1000",
    estado: true,
  },
];

module.exports = {
  get: async (req, res) => {
      
    const query = req.query.q.toLowerCase();
    const filtered = restaurants.filter(r => { 
      const name = r.conten.toLowerCase()
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
