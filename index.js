require('dotenv').config();
const port = process.env.PORT || 8080   // establecemos nuestro puerto 

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

const userRoute = require("./routes/User");
const restaurantRoute = require("./routes/Restaurant");
const searchRoute = require("./routes/Search");
const favoritesRoute = require("./routes/Favorites");
const menuRoute = require("./routes/Menu");
const reservationRoute = require('./routes/Reservation')
const reviewRoute = require('./routes/Review')

let app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));//cambie algo puede romper
app.use(express.json());
app.use(cookieParser());

// app.use('/auth', authRoutes);

app.use("/user", userRoute);

app.use("/restaurant", restaurantRoute)

app.use("/search", searchRoute)

app.use("/favorites", favoritesRoute)

app.use("/menu", menuRoute)

app.use("/reservation", reservationRoute)

app.use("/review", reviewRoute)

app.get('/', (req, res) => res.json({ message: 'Rico API' }));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(port, () =>{
    console.log("Servidor corriendo en el puerto 8080");
});

  module.exports = app;
