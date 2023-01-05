const express = require("express");


const { sequelize, Rating, Reviewer } = require("../models");

const route = express.Router();


route.get("/", async (req, res) => {
    try {
        const sviRecenzenti = await Reviewer.findAll();
        return res.json(sviRecenzenti);

    } catch(err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});


route.get('/:name', (req, res) => {
    Reviewer.findOne({ where: { rev_name: req.params.name } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

})

module.exports = route;
