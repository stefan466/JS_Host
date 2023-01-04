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
      {id:"201", first_name:"Alfred", last_name:"Hitchcock"},
      {id:"202", first_name:"Jack", last_name:"Clayton"},
      {id:"203", first_name:"David", last_name:"Lean"},
      {id:"204", first_name:"Michael", last_name:"Cimino"},
      {id:"205", first_name:"Milos", last_name:"Forman"}
      
      
    
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
