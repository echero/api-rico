require('dotenv').config();

const PORT = process.env.PORT || 8080; // establecemos nuestro puerto

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// const userRoute = require('./routes/User');
const restaurantsRoutes = require('./routes/restaurants');
// const searchRoute = require('./routes/Search');
// const favoritesRoute = require('./routes/Favorites');
// const menuRoute = require('./routes/Menu');
const reservationRoutes = require('./routes/Reservation');
const reviewsRoutes = require('./routes/reviews');
const authRoutes = require('./routes/auth');

const app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true })); // cambie algo puede romper
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);

// app.use('/user', userRoute);

app.use('/restaurants', restaurantsRoutes);

// app.use('/search', searchRoute);

// app.use('/favorites', favoritesRoute);

// app.use('/menu', menuRoute);

app.use('/reservation', reservationRoutes);

app.use('/reviews', reviewsRoutes);

app.get('/', (req, res) => res.json({ message: 'Rico API' }));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, async () => {
  await mongoose.connect(process.env.MONGO_URI);

  console.info(`Server running on  http://localhost:${PORT}`);
});

module.exports = app;
