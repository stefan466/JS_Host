const actorRoutes = require('./actor');
const movie_castRoutes = require('./movie_cast');
const movieRoutes = require('./movie');
const ratingRoutes = require('./rating');
const reviewerRoutes = require('./reviewer');
const directorRoutes = require('./director');
const genreRoutes = require('./genre');
const movieGenreRoutes = require('./movie_genre');
const movieDirectionRoutes = require('./movie_direction');

const express = require('express');

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.use('/actors', actorRoutes);
route.use('/movie-casts', movie_castRoutes);
route.use('/movies', movieRoutes);
route.use('/ratings', ratingRoutes);
route.use('/reviewers', reviewerRoutes);
route.use('/directors', directorRoutes);
route.use('/genres', genreRoutes);
route.use('/movieGenres', movieGenreRoutes);
//route.use('/movieDirectors', movieDirectionRoutes);



module.exports = route;