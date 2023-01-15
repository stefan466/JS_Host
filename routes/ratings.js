const express = require('express');
const { sequelize, Rating, Reviewers } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { idSchema, ratingSchema } = require('../validation.js');
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

route.get('/ratings', (req, res) => {
    Rating.findAll()
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

route.get('/ratings/:id', (req, res) => {
    
    Rating.findOne({ where: { id: req.params.id } })
        .then( usr => {
            const result = idSchema.validate(req.params);
            if(result.error){
                res.status(422).json({ msg: 'Greška u validaciji: ' + result.error.message });
            } else {
                Rating.findOne({ where: { id: req.params.id } })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) ); 
            }
        })
        .catch( err => res.status(500).json(err) );


});

route.post('/ratings', (req, res) => {
                    Rating.create({ 
                        rev_star: req.body.rev_star,
                        num_of_ratings: req.body.num_of_ratings,
                        reviewerID: req.body.reviewerID,
                        movieID: req.body.movieID
                    })
                        .then( rows => res.json(rows) )
                        .catch( err => res.status(500).json(err) );
        

});

route.put('/ratings/:id', (req, res) => {
    Rating.findOne({ where: { id: req.params.id }})
    .then( rating => {
        rating.rev_star = req.body.rev_star,
        rating.num_of_ratings = req.body.num_of_ratings,
        rating.reviewerID = req.body.reviewerID,
        rating.movieID = req.body.movieID

        rating.save()
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    })
    .catch( err => res.status(500).json(err) );
      

});

route.delete('/ratings/:id', (req, res) => {
    
    Rating.findOne({ where: { id: req.params.id } })
        .then( rat => {
            if (rat.admin) {
                const result = idSchema.validate(req.params);
                if(result.error){
                    res.status(422).json({ msg: 'Greška u validaciji: ' + result.error.message });
                } else {
                    Rating.findOne({ where: { id: req.params.id } })
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