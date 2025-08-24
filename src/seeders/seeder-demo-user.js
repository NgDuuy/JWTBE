'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
    */
    await queryInterface.bulkInsert('Users',
      [
        {
          email: 'duy@gmail.com',
          password: "123456",
          username: 'Nguyễn Đức Duy'
        },
        {
          email: 'duy1@gmail.com',
          password: "123456",
          username: 'Nguyễn Đức Duy1'
        },
        {
          email: 'duy12@gmail.com',
          password: "123456",
          username: 'Nguyễn Đức Duy2'
        },
      ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
