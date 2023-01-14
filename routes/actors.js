const express = require('express');
const { sequelize, Actor } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { idSchema, actorSchema } = require('../validation.js');
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/actors', (req, res) => {
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