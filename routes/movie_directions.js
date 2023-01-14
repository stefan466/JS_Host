const express = require("express");
const { Movie_Direction } = require('../models');
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));


module.exports = route;