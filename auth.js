const express = require('express');
const { sequelize, Reviewer } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
const { reviewerSchema, loginSchema } = require('./validation.js');
const PORT = 9400;
const app = express();

var corsOptions = {
    origin: 'https://js-host.onrender.com',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.post('/auth_register', (req, res) => {
    const result = reviewerSchema.validate(req.body);
    if(result.error){
        res.status(422).json({ msg: 'Greška u validaciji: ' + result.error.message });
    } else {
        const obj = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
            admin: req.body.admin,
        };

        Reviewer.create(obj).then(rows => {
            const usr = {
                revId: rows.id,
                reviewer: rows.username
            }

            const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
            res.json({ token: token });
        }).catch(err => res.status(500).json({ msg:"Uneseni parametri nisu validni" }));
    }

});

app.post('/auth_login', (req, res) => {
    /* Reviewer.findOne({ where: { username: req.body.username } })
        .then( usr => {

            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    revId: usr.id,
                    reviewer: usr.username
                };

                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                res.json({ token: token, userId: usr.id});
                
            } else {
                res.status(400).json({ msg: "Uneseni kredencijali nisu validni."});
            }
        })
        .catch( err => res.status(500).json( {msg: "Uneseni kredencijali nisu validni."}) ); */
  
    console.log("Usao u /login");
    console.log(req.body.username);
    const result = loginSchema.validate(req.body);

    Reviewer.findOne({ where: { username: req.body.username } })
        .then( usr => {

            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    revId: usr.id,
                    reviewer: usr.username
                };

                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                res.json({ token: token, userId: usr.id});
                
            } else {
                res.status(400).json({ msg: "Invalid credentials" });
            }
        })
        .catch( err => res.status(500).json({err}) );

});

/* app.post('/auth_login', (req, res) => {
    console.log("Request: " + req.body.username + req.body.password);
    const result = loginSchema.validate(req.body);

    if(result.error){
        //console.log("Tekst: " + req.body.username);
        res.status(422).json({ msg: 'Greška u validaciji: ' + result.error.message });
    } else {
        Reviewer.findOne({ where: { username: req.body.username } })
        .then( usr => {

            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    revId: usr.id,
                    reviewer: usr.username
                };

                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                res.json({ token: token, userId: usr.id});
                
            } else {
                res.status(400).json({ msg: "Uneseni kredencijali nisu validni."});
            }
        })
        .catch( err => res.status(500).json( {msg: "Uneseni kredencijali nisu validni."}) );
    }

});
 */



sequelize.authenticate()
    .then(() => console.log('Konektovani ste na bazu.'))
    .catch(err => console.log('Greska: ' + err));

app.listen(PORT, () => {
    console.log(`Autentifikacioni servis je pokrenut: http://127.0.0.1:${PORT}`)
});