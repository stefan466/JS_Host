'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie_Cast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Actor, Movie}) {
      // define association here
      this.belongsTo(Actor, {
        foreignKey: 'actorID',
        as: 'actor'
      });
      this.belongsTo(Movie, {
        foreignKey:'movieID',
        as:'movie'
      }); 
    }
  }
  Movie_Cast.init({
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movie_Cast',
  });
  return Movie_Cast;
};