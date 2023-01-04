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
    await queryInterface.bulkInsert('actors', 
    [
      {id:"101",first_name:"James", last_name:"Stewart", gender:"M"},
      {id:"102",first_name:"Deborah", last_name:"Kerr", gender:"F"},
      {id:"103",first_name:"Peter", last_name:"OToole", gender:"M"},
      {id:"104",first_name:"Robert", last_name:"De Niro", gender:"M"},
      {id:"105",first_name:"F. Murray", last_name:"Abraham", gender:"M"},
      
    
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Actors', null, {});
  }
};
