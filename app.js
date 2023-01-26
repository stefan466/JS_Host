const express = require('express');
const path = require('path');
const { sequelize } = require('./models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const PORT = 8090;

const app = express();

function getCookies(req) {
    if(req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach(rawCookies => {
        const parsedCookie = rawCookies.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });
    
    return parsedCookies;
}


function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];

    if(token==null) return res.redirect(301, '/login');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.redirect(301, '/login');
        req.user = user;
        next();
    });

}

//app.use(authToken);
app.get('/register', (req, res) => {
    res.sendFile('register.html', { root: './static' });
});


app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './static' });
});

app.get('/', (req, authToken, res) => {
    res.sendFile('home.html', { root: './static' });
}); 



app.use(express.static(path.join(__dirname, 'static')));



//Pokrecemo http server na portu 8000
sequelize.authenticate()
    .then(() => console.log('Konektovani ste na bazu.'))
    .catch(err => console.log('Greska: ' + err));

app.listen(PORT, () => {
    console.log(`Aplikacioni servis je pokrenut: http://127.0.0.1:${PORT}`)
});