const express = require('express');
const { sequelize } = require('./models');
const cors = require('cors');
const PORT = 8600;

const actors = require('./routes/actors');
const movie_casts = require('./routes/movie_casts');
const movies = require('./routes/movies');
const ratings = require('./routes/ratings');
const reviewer = require('./routes/reviewers');
const director = require('./routes/directors');
const genre = require('./routes/genres');
const movieGenre= require('./routes/movie_genres');
const movieDirection = require('./routes/movie_directions');

const app = express();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.use('/admin', actors);
app.use('/admin', movie_casts);
app.use('/admin', movies);
app.use('/admin', ratings);
app.use('/admin', reviewer);
app.use('/admin', director);
app.use('/admin', genre);
app.use('/admin', movieGenre);
app.use('/admin', movieDirection);

sequelize.authenticate()
    .then(() => console.log('Konektovani ste na bazu.'))
    .catch(err => console.log('Greska: ' + err));

app.listen(PORT, () => {
    console.log(`REST servis je pokrenut: http://127.0.0.1:${PORT}`)
});
