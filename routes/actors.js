const express = require('express');
const { sequelize, Actor, Reviewer } = require('../models');
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

route.get('/actors', (req, res) => {
    Actor.findAll()
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

route.get('/actors/:id', (req, res) => {
    
    Actor.findOne({ where: { id: req.params.id } })
        .then( usr => {
            const result = idSchema.validate(req.params);
            if(result.error){
                res.status(422).json({ msg: 'Greška u validaciji: ' + result.error.message });
            } else {
                Actor.findOne({ where: { id: req.params.id } })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) ); 
            }
        })
        .catch( err => res.status(500).json(err) );


});

route.post('/actors', (req, res) => {
                    Actor.create({ 
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        gender: req.body.gender
                    })
                        .then( rows => res.json(rows) )
                        .catch( err => res.status(500).json(err) );
        

});

route.put('/actors/:id', (req, res) => {
    Actor.findOne({ where: { id: req.params.id }})
    .then( act => {
        act.first_name = req.body.first_name,
        act.last_name = req.body.last_name,
        act.gender = req.body.gender

        act.save()
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    })
    .catch( err => res.status(500).json(err) );
      

});

route.delete('/actors/:id', (req, res) => {

    Actor.findOne({ where: { id: req.params.id } })
        .then( act => {

            act.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
    
   /*  Reviewer.findOne({ where: { id: req.rev} })
    .then( usr => {
        if (usr.admin) {
            const result = idSchema.validate(req.params);
            if(result.error){
                res.status(422).json({ msg: 'Greška u validaciji: ' + result.error.message });
            } else {
                Actor.findOne({ where: { id: req.params.id }})
                .then( result => {
                    result.destroy()
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