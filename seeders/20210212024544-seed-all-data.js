const jsSHA = require('jssha');
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const listOfCars = [];
    for (let i = 0; i < 10; i += 1) {
      listOfCars.push({
        name: faker.vehicle.model(),
        details: faker.vehicle.vehicle(),
        price: Math.random() * 100,
        isAvailable: true,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
    shaObj.update('password');
    const hashedPassword = shaObj.getHash('HEX');

    const listOfUsers = [
      {
        username: 'user1',
        password: hashedPassword,
        email: 'user1@gmail.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'user2',
        password: hashedPassword,
        email: 'user2@gmail.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('cars', listOfCars);
    await queryInterface.bulkInsert('users', listOfUsers);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('cars', null, {});
  },
};
