const review = require('../models/review')
const reviewData = require('../data/review')
const Restaurant = require('../data/Restaurant')

module.exports = {
    getByRestaurantId: (req, res) => {
         //probar
        const { id } = req.params;
    
        const restaurant = Restaurant.findById(id).populate('reviews');
    
        if (restaurant) {
          return res.json(restaurant.reviews);
        }
    
        return res.status(404).json({
          error: true,
          message: 'No existe el restaurante.',
        });
      },
      create:  (req, res) => {
        //probar
        const { datos } = req.body;
    
        const review = Review.create({
         datos
        });
         review.save();
    
        const restaurant = Restaurant.findById(restaurantId);
    
        restaurant.reviews.push(review);
    
         restaurant.save();
    
        return res.send(review);
      },
}
//get
//get
//post
//delete