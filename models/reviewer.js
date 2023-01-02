'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviewer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Rating}) {
      // define association here
      this.hasMany(Rating, {
        foreignKey: 'reviewerID',
        as: 'ratings'
      });
    }
  }
  Reviewer.init({
    rev_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reviewer',
  });
  return Reviewer;
};