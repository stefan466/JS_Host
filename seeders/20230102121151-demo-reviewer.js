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
    await queryInterface.bulkInsert('reviewers', 
    [
      {id:"9001", rev_name:"Righty Sock"},
      {id:"9002", rev_name:"Jack Malvern"},
      {id:"9003", rev_name:"Flagrant Baronessa"},
      {id:"9004", rev_name:"Alec Shaw"},
      {id:"9005", rev_name:""}
      
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Reviewers', null, {});
  }
};
