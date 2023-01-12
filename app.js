const path = require("path");
const express = require("express");
const routes = require('./routes/routes');
const { sequelize } = require("./models");


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

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, 'static', 'home.html'));
});


/* const reviewerRoutes = require("./routes/reviewer.js");
app.use("/reviewer", reviewerRoutes);


const ratingRoutes = require("./routes/rating.js");
app.use("/rating", ratingRoutes); */

app.use('/admin', routes);

//Pokrecemo http server na portu 8000
app.listen({ port:8090 }, async () => {
    console.log("Started server on localhost:8090");
});