const express = require('express');
const { sequelize } = require('./models');
const cors = require('cors');
const PORT = 8800;

const movies = require('./routes/movies');
const actors = require('./routes/actors');
const directors = require('./routes/directors');
const reviewers = require('./routes/reviewers');
const genres = require('./routes/genres');
const movie_casts = require('./routes/movie_casts');
const movie_genres = require('./routes/movie_genres');
const movie_direction = require('./routes/movie_directions');
const ratings = require('./routes/ratings');

const app = express();

var corsOptions = {
    origin: 'https://js-host.onrender.com',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.use('/admin', ratings);
app.use('/admin', reviewers);
app.use('/admin', actors);
app.use('/admin', directors);
app.use('/admin', genres); 
app.use('/admin', movies);
app.use('/admin', movie_casts);
app.use('/admin', movie_direction); 
app.use('/admin', movie_genres);




//app.use('/admin', directors, movies, actors, reviewers);

sequelize.authenticate()
    .then(() => console.log('Konektovani ste na bazu.'))
    .catch(err => console.log('Greska: ' + err));

app.listen(PORT, () => {
    console.log(`REST servis je pokrenut: http://127.0.0.1:${PORT}`)
});