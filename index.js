const express = require("express");
const app = express();
const port = 3000;

const userRoute = require("./routes/User");
const restaurantRoute = require("./routes/Restaurant");
const registerRouter = require('./routes/Register')

app.use("/user", userRoute);

app.use("/restaurant", restaurantRoute)
// app.use("/restaurant/:id", restaurantRoute)

app.use("/register", registerRouter)

app.listen(port, () =>{
    console.log("Servidor corriendo en el puerto 3000");
});
