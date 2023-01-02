const express = require("express");


const { sequelize, Rating, Reviewer } = require("../models");

const route = express.Router();
module.exports = route;


route.get("/", async (req, res) => {
    try {
        const sviRecenzenti = await Reviewer.findAll();
        return res.json(sviRecenzenti);

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