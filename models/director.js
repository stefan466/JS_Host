'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Director extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Movie_Direction}) {
      // define association here
      this.hasMany(Movie_Direction, {
        foreignKey: 'movieID',
        as: 'mov_dir'
      });
    }
  }
  Director.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Director',
  });
  return Director;
};