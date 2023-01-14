const express = require('express');
const { sequelize } = require('./models');
const cors = require('cors');
const PORT = 8800;

const movies = require('./routes/movies');
const actors = require('./routes/actors');
const directors = require('./routes/directors');
const reviewers = require('./routes/reviewers');

const app = express();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

//app.use('/admin', reviewers);
app.use('/admin', directors, movies, actors, reviewers);
/* app.use('/admin', actors);
app.use('/admin', directors);
app.use('/admin', reviewers); */

sequelize.authenticate()
    .then(() => console.log('Konektovani ste na bazu.'))
    .catch(err => console.log('Greska: ' + err));

app.listen(PORT, () => {
    console.log(`REST servis je pokrenut: http://127.0.0.1:${PORT}`)
});