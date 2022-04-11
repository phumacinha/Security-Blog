/* eslint-disable camelcase */
import User from '../models/User';
import Role from '../models/Role';
import EncryptorService from '../services/EncryptorService';

module.exports = {
  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  },
  async store(req, res) {
    const {
      name,
      email,
      login,
      password,
      rolesId,
    } = req.body;

    const user = await User.create({
      name,
      email,
      login,
      password: EncryptorService.hashPassword(password),
    });

    // const roles = await Promise.all((rolesId || [])
    //   .map((roleId) => Role.findByPk(roleId).then((role) => role)));

    return res.json(user);
  },
};
