//Ukljucujemo potrebne pakete
const path = require("path");
const express = require("express");
//Ukljucujemo sequelize i modele
const { sequelize,  Reviewer, Rating } = require("./models");

//Instanciramo express aplikaciju
const app = express();

//Definisemo handler za home rutu, koji vraca fajl static/index.html
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

//Ukljucujemo skript u kome su handleri za rute /student/...
const reviewerRoutes = require("./routes/reviewer.js");
app.use("/reviewer", reviewerRoutes);

//Ovde treba da ukljucimo handlere za rute /smer/...
//...
const ratingRoutes = require("./routes/rating.js");
app.use("/rating", ratingRoutes);

//Pokrecemo http server na portu 8000
app.listen({ port:8090 }, async () => {
    console.log("Started server on localhost:8090");
});