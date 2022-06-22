const review = require('../models/review')
const reviewData = require('../data/review')

module.exports = {
    get : (req, res) => {
        res.status(200)
        res.json(reviewData)
        
    }
}
//get
//get
//post
//delete