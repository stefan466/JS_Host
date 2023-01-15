const express = require('express');
const { sequelize, Movie } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { idSchema, MovieSchema } = require('../validation.js');
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ msg: err });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ msg: err });
        req.user = user;
        next();
    });
}

//route.use(authToken);

route.get('/movies', (req, res) => {
    Movie.findAll()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
    /* 
    Reviewer.findOne({ where: { id: req.params.id } })
        .then( usr => {
            Reviewer.findAll()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) ); */
    
});

route.get('/movies/:id', (req, res) => {
    
    Movie.findOne({ where: { id: req.params.id } })
        .then( usr => {
            const result = idSchema.validate(req.params);
            if(result.error){
                res.status(422).json({ msg: 'Greška u validaciji: ' + result.error.message });
            } else {
                Movie.findOne({ where: { id: req.params.id } })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) ); 
            }
        })
        .catch( err => res.status(500).json(err) );


});

route.post('/movies', (req, res) => {
                    Movie.create({ 
                        mov_title: req.body.mov_title,
                        mov_lang: req.body.mov_lang,
                        mov_year: req.body.mov_year,
                        mov_time: req.body.mov_time,
                        mov_rel_country: req.body.mov_rel_country
                    })
                        .then( rows => res.json(rows) )
                        .catch( err => res.status(500).json(err) );
        

});

route.put('/movies/:id', (req, res) => {
    Movie.findOne({ where: { id: req.params.id }})
    .then( mov => {
        mov.mov_title = req.body.mov_title,
        mov.mov_lang = req.body.mov_lang,
        mov.mov_year = req.body.mov_year,
        mov.mov_time = req.body.mov_time
        mov.mov_rel_country = req.body.mov_rel_country


        mov.save()
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    })
    .catch( err => res.status(500).json(err) );
      

});

route.delete('/movies/:id', (req, res) => {
    
    Movie.findOne({ where: { id: req.params.id } })
        .then( mov => {
            if (mov.admin) {
                const result = idSchema.validate(req.params);
                if(result.error){
                    res.status(422).json({ msg: 'Greška u validaciji: ' + result.error.message });
                } else {
                    Movie.findOne({ where: { id: req.params.id } })
                    .then( rev => {
                        rev.destroy()
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