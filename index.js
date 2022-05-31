const express = require("express"); //server-express
const app = express();      //initialize app
require('dotenv').config()
const port = process.env.PORT || 8080   // establecemos nuestro puerto 

const userRoute = require("./routes/User");
const restaurantRoute = require("./routes/Restaurant");
const searchController = require("./controllers/SearchController")

app.use("/user", userRoute);

app.use("/restaurant", restaurantRoute)
// app.use("/restaurant/:id", restaurantRoute)

app.use("/search", searchController)

app.listen(port, () =>{
    console.log("Servidor corriendo en el puerto 3000");
});
