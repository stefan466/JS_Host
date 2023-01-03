'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Movie_Genre}) {
      // define association here
      this.hasMany(Movie_Genre, {
        foreignKey: 'genreID',
        as: 'genre'
      });
    }
  }
  Genre.init({
    genre_title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Genre',
  });
  return Genre;
};