const express = require("express");
const app = express();
const port = 3000;

const axios = require('axios');

module.exports = {
    get: () =>  {
        return axios.get('http://127.0.0.1:3000/user');
    }
};

const userRoute = require("./routes/User");
app.use("/user", userRoute);

const restaurantRoute = require("./routes/Restaurant");
app.use("/restaurant", restaurantRoute)
app.use("/restaurant/:id", restaurantRoute)

app.listen(port, () =>{
    console.log("Servidor corriendo en el puerto 3000");
});
