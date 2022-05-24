const express = require("express");
const app = express();
const port = 3000;

// const axios = require('axios');
const userRoute = require("./routes/User");
const restaurantRoute = require("./routes/Restaurant");

// module.exports = {
//     get: () =>  {
//         return axios.get('http://127.0.0.1:3000/user');
//     }

// };


app.use("/user", userRoute);


app.use("/restaurant", restaurantRoute)
app.use("/restaurant/:id", restaurantRoute)

app.listen(port, () =>{
    console.log("Servidor corriendo en el puerto 3000");
});
