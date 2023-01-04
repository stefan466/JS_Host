const express = require("express");
const { Movie } = require('../models');
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/', (req, res) => {
    Movie.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});


route.get('/:id', (req, res) => {

    Movie.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.get('/:name', (req, res) => {

    Movie.findOne({ where: { mov_title: req.params.name } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});



module.exports = route;