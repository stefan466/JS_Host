const express = require("express");
const { Movie_Genre } = require('../models');
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));


module.exports = route;