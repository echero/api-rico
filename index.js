const express = require("express");
const app = express();
const port = 3000;

const userRoute = require("./routes/User");
const restaurantRoute = require("./routes/Restaurant");

app.use("/user", userRoute);


app.use("/restaurant", restaurantRoute)
// app.use("/restaurant/:id", restaurantRoute)

app.listen(port, () =>{
    console.log("Servidor corriendo en el puerto 3000");
});
