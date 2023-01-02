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
    await queryInterface.bulkInsert('movie_casts', 
    [
      {actorID:"101", movieID:"901", role:"John Scottie Ferguson"},
      {actorID:"102", movieID:"902", role:"Miss Giddens"},
      {actorID:"103", movieID:"903", role:"T.E. Lawrence"}
      
    
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Movie_Casts', null, {});
  }
};
