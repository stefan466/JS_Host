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
    await queryInterface.bulkInsert('ratings', 
    [
      {movieID:"901", reviewerID:"9001", rev_stars:"8.40", num_of_ratings:"263575"},
      {movieID:"902", reviewerID:"9002", rev_stars:"7.90", num_of_ratings:"20207"},
      {movieID:"903", reviewerID:"9003", rev_stars:"8.30", num_of_ratings:"202778"}
      
    
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    
    await queryInterface.bulkDelete('Ratings', null, {});
  }
};
