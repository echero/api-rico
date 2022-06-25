const restaurants = require('../data/Restaurant');

module.exports = {
  // REGLA DE NEGOCIO <BUSQUEDA POR NOMBRE Y DIRECCION>
  get: async (req, res) => {
    const query = req.query.q.toLowerCase();
    const filtered = restaurants.filter((r) => {
      const name = r.name.toLowerCase();
      const direction = r.direction.toLowerCase();
      // retorno sí el nombre del restaurant convertido en minuscula
      // contiene la palabra que recibo por query string
      return name.includes(query) || direction.includes(query);
    });

    if (filtered.length === 0) {
      return res.status(404).json({ message: 'No hay resultados' });
    }
    return res.json(filtered);
  },
};
