const reservation = require('../models/reservation')
const reservationData = require('../data/Reservation')

module.exports = {
    get : (req, res) => {
        res.status(200)
        res.json(reservationData)
        
    }
}
//get
//get
//post
//delete