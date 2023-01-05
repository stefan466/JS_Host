const path = require("path");
const express = require("express");
const routes = require('./routes/routes');
const { sequelize } = require("./models");


const app = express();

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, 'static', 'home.html'));
});


/* const reviewerRoutes = require("./routes/reviewer.js");
app.use("/reviewer", reviewerRoutes);


const ratingRoutes = require("./routes/rating.js");
app.use("/rating", ratingRoutes); */

app.use('/admin', routes);

//Pokrecemo http server na portu 8000
app.listen({ port:8090 }, async () => {
    console.log("Started server on localhost:8090");
});