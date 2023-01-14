const express = require('express');
const { sequelize, Reviewer, Ratings } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { idSchema, reviewerSchema } = require('../validation.js');
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));


route.get("/reviewers", async (req, res) => {
    Reviewer.findAll()
    .then( rows => res.json(rows) )
    .catch( err => res.status(500).json(err) );

    /* try {
        const sviRecenzenti = await Reviewer.findAll();
        return res.json(sviRecenzenti);

    } catch(err) {
        console.log(err); 
        res.status(500).json({ error: "Greska", data: err });
    } */
});


route.get('/:name', (req, res) => {
    Reviewer.findOne({ where: { rev_name: req.params.name } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

})

module.exports = route;
