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
    await queryInterface.bulkInsert('directors', 
    [
      {id:"1001", first_name:"Alfred", last_name:"Hitchcock"},
      {id:"1002", first_name:"Jack", last_name:"Clayton"},
      {id:"1003", first_name:"David", last_name:"Lean"}
      
      
    
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Directors', null, {});
  }
};
