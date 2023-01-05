const express = require("express");
const { sequelize, Rating, Reviewer } = require("../models");

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));


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

route.get("/:id", async (req, res) => {
    try {
        let rejtingPoRecenzentu = await Rating.findAll({
            where: {
                reviewerID: req.params.id
            }
        });
        return res.json(rejtingPoRecenzentu);

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

module.exports = route;
