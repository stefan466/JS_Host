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
      {id:"701", movieID:"901", directorID:"201"},
      {id:"702", movieID:"902", directorID:"202"},
      {id:"703",movieID:"903", directorID:"203"},
      {id:"704",movieID:"904", directorID:"204"},
      {id:"705", movieID:"905", directorID:"205"}

      
      
    
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
