const express = require('express');
const { sequelize, Movie_Direction, Movie, Director} = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { idSchema } = require('../validation.js');
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

route.get('/movie_directions', (req, res) => {
    Movie_Direction.findAll()
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

route.get('/movie_directions/:id', (req, res) => {
    
    Movie_Direction.findOne({ where: { id: req.params.id } })
        .then( usr => {
            const result = idSchema.validate(req.params);
            if(result.error){
                res.status(422).json({ msg: 'Greška u validaciji: ' + result.error.message });
            } else {
                Movie_Direction.findOne({ where: { id: req.params.id } })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) ); 
            }
        })
        .catch( err => res.status(500).json(err) );


});

route.post('/movie_directions', (req, res) => {
                    Movie_Direction.create({ 
                        movieID: req.body.movieID,
                        directorID: req.body.directorID
                     
                    })
                        .then( rows => res.json(rows) )
                        .catch( err => res.status(500).json(err) );
        

});

route.put('/movie_directions/:id', (req, res) => {
    Movie_Direction.findOne({ where: { id: req.params.id }})
    .then( mov => {
        mov.movieID = req.body.movieID,
        mov.directorID = req.body.directorID,
       


        mov.save()
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    })
    .catch( err => res.status(500).json(err) );
      

});

route.delete('/movie_directions/:id', (req, res) => {
    Movie_Direction.findOne({ where: { id: req.params.id } })
    .then( md => {

        md.destroy()
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    })
    .catch( err => res.status(500).json(err) );
    
    /* Movie_Direction.findOne({ where: { id: req.params.id } })
        .then( mov => {
            if (mov.admin) {
                const result = idSchema.validate(req.params);
                if(result.error){
                    res.status(422).json({ msg: 'Greška u validaciji: ' + result.error.message });
                } else {
                    Movie_Direction.findOne({ where: { id: req.params.id } })
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
        .catch( err => res.status(500).json(err) ); */
    
 
});

module.exports = route;