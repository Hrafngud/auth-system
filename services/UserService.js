const { User } = require('../models');

class UserService {
  static async createUser({ username, password, role, phone, cpf, email }) {
    const userCount = await User.count();
    const userRole = userCount === 0 ? 'admin' : role || 'user';

    return await User.create({
      username,
      password,
      role: userRole,
      phone,
      cpf,
      email,
    });
  }
}

module.exports = UserService;
