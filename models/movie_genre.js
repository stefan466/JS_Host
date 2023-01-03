'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie_Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Movie, Genre}) {
      // define association here
      this.belongsTo(Movie, {
        foreignKey: 'movieID',
        as: 'movie'
      });
      this.belongsTo(Genre, {
        foreignKey:'genreID',
        as:'genre'
      }); 
    }
  }
  Movie_Genre.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movie_Genre',
  });
  return Movie_Genre;
};