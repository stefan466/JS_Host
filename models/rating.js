'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Reviewer, Movie}) {
      // define association here

      this.belongsTo(Reviewer, {
        foreignKey: 'reviewerID',
        as: 'rev'
      });
      this.belongsTo(Movie, {
        foreignKey:'movieID',
        as:'movie'
      }); 
    }
  }
  Rating.init({
    rev_stars: DataTypes.DOUBLE,
    num_of_ratings: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};