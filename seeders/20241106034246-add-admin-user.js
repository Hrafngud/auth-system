const bcrypt = require('bcryptjs');
require('dotenv').config();  // Ensure .env variables are loaded

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hash the password from the environment variable
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    return queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        password: hashedPassword,
        role: 'admin',
        phone: '(12)3456-7890',     // Replace with desired phone number
        cpf: '176.047.637-40',      // Provided CPF
        email: 'admin@admin.com',  // Replace with desired email
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', { username: 'admin' }, {});
  }
};
