'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Movie_Cast}) {
      // define association here
      this.hasMany(Movie_Cast, {
        foreignKey: 'movieID',
        as: 'casts'
      });
    }
  }
  Movie.init({
    mov_title: DataTypes.STRING,
    mov_lang: DataTypes.STRING,
    mov_year: DataTypes.INTEGER,
    mov_time: DataTypes.INTEGER,
    mov_rel_country: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};