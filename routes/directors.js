const express = require("express");
const { Director } = require('../models');
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));


route.get('/directors', (req, res) => {
    Director.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});


route.get('/:id', (req, res) => {

    Director.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

module.exports = route;