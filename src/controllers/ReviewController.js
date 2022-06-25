const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');

module.exports = {
  getByRestaurantId: async (req, res) => {
    const { id } = req.params;

    const restaurant = await Restaurant.findById(id).populate('reviews');

    if (restaurant) {
      return res.json(restaurant.reviews);
    }

    return res.status(404).json({
      error: true,
      message: 'No existe el restaurante.',
    });
  },
  create: async (req, res) => {
    const { score, comment, restaurantId } = req.body;

    const review = await Review.create({
      score,
      comment,
      restaurant: restaurantId,
    });
    await review.save();

    const restaurant = await Restaurant.findById(restaurantId);

    restaurant.reviews.push(review);

    await restaurant.save();

    return res.send(review);
  },
};
