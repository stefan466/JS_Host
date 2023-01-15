const express = require('express');
const { sequelize, Director } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { idSchema, directorSchema } = require('../validation.js');
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

route.get('/directors', (req, res) => {
    Director.findAll()
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

route.get('/directors/:id', (req, res) => {
    
     
    Director.findOne({ where: { id: req.params.id } })
        .then( usr => {
            const result = idSchema.validate(req.params);
            if(result.error){
                res.status(422).json({ msg: 'Greška u validaciji: ' + result.error.message });
            } else {
                Director.findOne({ where: { id: req.params.id } })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) ); 
            }
        })
        .catch( err => res.status(500).json(err) );


});

route.post('/directors', (req, res) => {
                    Director.create({ 
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                    })
                        .then( rows => res.json(rows) )
                        .catch( err => res.status(500).json(err) );
        

});

route.put('/directors/:id', (req, res) => {
    Director.findOne({ where: { id: req.params.id }})
    .then( dir => {
        dir.first_name = req.body.first_name,
        dir.last_name = req.body.last_name,

        dir.save()
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    })
    .catch( err => res.status(500).json(err) );
      

});

route.delete('/directors/:id', (req, res) => {
    
    Director.findOne({ where: { id: req.params.id } })
        .then( dir => {
            if (dir.admin) {
                const result = idSchema.validate(req.params);
                if(result.error){
                    res.status(422).json({ msg: 'Greška u validaciji: ' + result.error.message });
                } else {
                    Director.findOne({ where: { id: req.params.id } })
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