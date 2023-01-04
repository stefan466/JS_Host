'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('movie_directions', 
    [
      {movieID:"901", directorID:"201"},
      {movieID:"902", directorID:"202"},
      {movieID:"903", directorID:"203"},
      {movieID:"904", directorID:"204"},
      {movieID:"905", directorID:"205"}

      
      
    
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Movie_Directions', null, {});
  }
};
