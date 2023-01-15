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
      {id:"801", actorID:"101", movieID:"901", role:"John Scottie Ferguson"},
      {id:"802", actorID:"102", movieID:"902", role:"Miss Giddens"},
      {id:"803", actorID:"103", movieID:"903", role:"T.E. Lawrence"},
      {id:"804", actorID:"104", movieID:"904", role:"Michael"},
      {id:"805",actorID:"105", movieID:"905", role:"Antonio Salieri"}
      
    
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
