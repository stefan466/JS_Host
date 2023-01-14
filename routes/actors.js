const express = require("express");
const route = express.Router();
const { Actor } = require('../models');

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/', (req, res) => {
    Actor.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});


route.get('/:id', (req, res) => {

    Actor.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.get('/:year', (req, res) => {

    Actor.findOne({ where: { mov_year: req.params.year } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});




module.exports = route;