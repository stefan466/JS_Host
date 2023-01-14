const express = require("express");
const { Genre } = require('../models');
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/', (req, res) => {
    Genre.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});


route.get('/:id', (req, res) => {

    Genre.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});


module.exports = route;