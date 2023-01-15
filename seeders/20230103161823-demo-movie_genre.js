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
    await queryInterface.bulkInsert('movie_genres', 
    [
      {id:"601", movieID:"922", genreID:"1001"},
      {id:"602", movieID:"917", genreID:"1002"},
      {id:"603", movieID:"903", genreID:"1003"},
      {id:"604", movieID:"912", genreID:"1004"},
      {id:"605", movieID:"911", genreID:"1005"}


      
      
    
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Movie_Genres', null, {});
  }
};
