const express = require('express');
const { sequelize } = require('./models');
const cors = require('cors');
const PORT = 8600;

const actorRoutes = require('./routes/actor');
const movie_castRoutes = require('./routes/movie_cast');
const movieRoutes = require('./routes/movie');
const ratingRoutes = require('./routes/rating');
const reviewerRoutes = require('./routes/reviewer');
const directorRoutes = require('./routes/director');
const genreRoutes = require('./routes/genre');
const movieGenreRoutes = require('./routes/movie_genre');
const movieDirectionRoutes = require('./routes/movie_direction');

const app = express();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.use('/admin', actorRoutes);
app.use('/admin', movie_castRoutes);
app.use('/admin', movieRoutes);
app.use('/admin', ratingRoutes);
app.use('/admin', reviewerRoutes);
app.use('/admin', directorRoutes);
app.use('/admin', genreRoutes);
app.use('/admin', movieGenreRoutes);
app.use('/admin', movieDirectionRoutes);

sequelize.authenticate()
    .then(() => console.log('Konektovani ste na bazu.'))
    .catch(err => console.log('Greska: ' + err));

app.listen(PORT, () => {
    console.log(`REST servis je pokrenut: http://127.0.0.1:${PORT}`)
});
