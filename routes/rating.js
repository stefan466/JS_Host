const express = require("express");
const { sequelize, Rating, Reviewer } = require("../models");

//Dohvatamo router nase express aplikacije (u redu 2 je dohvacena ista instanca kao i u app.js)
const route = express.Router();

//Treba nam json() middleware
route.use(express.json());
//Treba nam i urlencoded middleware, koji ce da sredi sadrzaj url-a ako ima nase znakove i sl.
route.use(express.urlencoded({extended:true}));

//Eksportujemo route objekat, da bude vidljiv u app.js
module.exports = route;

//Ruta /rating
route.get("/", async (req, res) => {
    try{
        const sviRejtinzi = await Rating.findAll();
        return res.json(sviRejtinzi);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/:id", async (req, res) => {
    try {
        let rejting = await Rating.findByPk(req.params.id);
        return res.json(rejting);
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/", async (req, res) => {
    try {
        let noviRejting = await Rating.create(req.body);
        res.send(noviRejting);
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.put("/", async (req, res) => {
    try {
        let rejting = await Student.findByPk( req.params.id );
        rejting.rev_star = req.rev_star;
        rejting.num_of_ratings= req.num_of_ratings;
        rejting.reviewerID = req.reviewerID;
        rejting.movieID = req.movieID;
       
        await rejting.save();
        res.send(rejting);

    } catch(err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});