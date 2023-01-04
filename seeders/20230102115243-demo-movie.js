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

    await queryInterface.bulkInsert('movies', 
    [
      {id:"901",mov_title:"Vertigo", mov_lang:"English", mov_year:"1958", mov_time:"128", mov_rel_country:"UK"},
      {id:"902",mov_title:"The Innocents", mov_lang:"English", mov_year:"1961", mov_time:"100", mov_rel_country:"SW"},
      {id:"903",mov_title:"Lawrence of Arabia", mov_lang:"English", mov_year:"1962", mov_time:"216", mov_rel_country:"UK"},
      {id:"904",mov_title:"The Deer Hunter", mov_lang:"English", mov_year:"1978", mov_time:"183", mov_rel_country:"UK"},
      {id:"905",mov_title:"Amadeus", mov_lang:"English", mov_year:"1984", mov_time:"160", mov_rel_country:"UK"}
    
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Movies', null, {});
  }
};
