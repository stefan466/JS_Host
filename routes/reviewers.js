const express = require('express');
const { sequelize, Reviewer } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { idSchema, userSchema } = require('../validation.js');
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

route.get('/reviewers', (req, res) => {
    
    /* 
    Reviewer.findOne({ where: { id: req.params.id } })
        .then( usr => {
            Reviewer.findAll()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) ); */
    
});

route.get('/reviewers/:id', (req, res) => {
    
    Reviewer.findOne({ where: { id: req.params.id } })
        .then( usr => {
            const result = idSchema.validate(req.params);
            if(result.error){
                res.status(422).json({ msg: 'Greška u validaciji: ' + result.error.message });
            } else {
                Reviewer.findOne({ where: { id: req.params.id } })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) ); 
            }
        })
        .catch( err => res.status(500).json(err) );


});

route.post('/post_reviewers', (req, res) => {
                    Reviewer.create({ 
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        username: req.body.username,
                        password: req.body.password,
                        admin: req.body.admin,
                    })
                        .then( rows => res.json(rows) )
                        .catch( err => res.status(500).json(err) );
        

});

route.put('/reviewers/:id', (req, res) => {
                    Reviewer.findOne({ where: { id: req.params.id } })
                    .then( rev => {
                        rev.first_name = req.body.first_name;
                        rev.last_name = req.body.last_name;
                        rev.username = req.body.username;
                        rev.password = req.body.password;
                        rev.admin = req.body.admin;


                        rev.save()
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err) );
                    })
                    .catch( err => res.status(500).json(err) );
      

});

route.delete('/reviewers/:id', (req, res) => {
    Reviewer.findOne({ where: { id: req.params.id } })
    .then( rev => {

        rev.destroy()
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    })
    .catch( err => res.status(500).json(err) );
   
    
 
});

module.exports = route;