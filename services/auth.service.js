const UserRepository = require('../repositories/user.repository');
const TokenService = require('../services/token.service');

class AuthService {
  static async register({ name, email, password, phone, address, role = 'user' }) {
    const existingUser = await UserRepository.getUserByEmail(email);
    if (existingUser) {
      const error = new Error('Email already in use');
      error.status = 400;
      throw error;
    }

    const hashedPassword = await TokenService.hashPassword(password);

    const newUser = await UserRepository.createUser({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role
    });

    const accessToken = TokenService.generateToken(newUser.id, newUser.role);

    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone,
        address: newUser.address
      },
      accessToken
    };
  }

  static async login({ email, password }) {
    const user = await UserRepository.getUserByEmail(email);
    if (!user) {
      const error = new Error('Invalid email or password');
      error.status = 400;
      throw error;
    }

    if (user.status === 'inactive') {
      const error = new Error('User is inactive');
      error.status = 400;
      throw error;
    }

    const isMatch = await TokenService.comparePassword(password, user.password);
    if (!isMatch) {
      const error = new Error('Invalid email or password');
      error.status = 400;
      throw error;
    }

    const accessToken = TokenService.generateToken(user.id, user.role);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address
      },
      accessToken
    };
  }
}

module.exports = AuthService;
