import bcrypt from 'bcrypt-nodejs';
import JwtService from './jwtService';

module.exports = {
  hashPassword: (password) => bcrypt.hashSync(password),

  comparePassword: (password, user) => bcrypt.compareSync(password, user.password),

  generateToken: (data, expiresIn = '2 days') => JwtService.issue({ data }, expiresIn),
};
