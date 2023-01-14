const express = require('express');
const { sequelize, Movie, Reviewer } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { idSchema, movieSchema } = require('../validation.js');
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/movies',  (req, res) => {
   
    Movie.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});


route.get('/movies/:id', (req, res) => {

    Movie.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.get('/:name', (req, res) => {

    Movie.findOne({ where: { mov_title: req.params.name } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/movies/:id', (req, res) => {
    Movie.findOne({ where: { id: req.params.id }})
    .then( mov => {
        mov.mov_title = req.body.mov_title;
        mov.mov_lang = req.body.mov_lang;
        mov.mov_year = req.body.mov_year;
        mov.mov_time = req.body.mov_time;
        mov.mov_rel_country = req.body.mov_rel_country;

        mov.save()
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    })
    .catch( err => res.status(500).json(err) );
      

});


route.delete('/movies/:id', (req, res) => {

    Reviewer.findOne({ where: { id: req.reviewer.userId } })
        .then( reviewer => {
            if (reviewer.admin || reviewer.moderator) {
                const result = idSchema.validate(req.params);
                if(result.error){
                    res.status(422).json({ msg: 'Greška u validaciji: ' + result.error.message });
                } else {
                    Movie.findOne({ where: { id: req.params.id } })
                    .then( mov => {
                        mov.destroy()
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err) );
                    })
                    .catch( err => res.status(500).json(err) );
                }
            } else {
                res.status(403).json({ msg: "Nemate pravo na ovu akciju."});
            }
        })
        .catch( err => res.status(500).json(err) );

});


module.exports = route;