'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie_Direction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Director, Movie}) {
      // define association here
      this.belongsTo(Director, {
        foreignKey: 'directorID',
        as: 'director'
      });
      this.belongsTo(Movie, {
        foreignKey:'movieID',
        as:'movie'
      }); 
    }
  }
  Movie_Direction.init({
  }, {
    sequelize,
    modelName: 'Movie_Direction',
  });
  return Movie_Direction;
};