/* eslint-disable camelcase */
import User from '../models/User';
import Group from '../models/Group';
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
      userGroups,
    } = req.body;

    const user = await User.create({
      name,
      email,
      login,
      password: EncryptorService.hashPassword(password),
    }).then();

    const groups = await Promise.all((userGroups || [])
      .map((groupId) => Group.findByPk(groupId).then((group) => group)));

    return res.json({ ...user.dataValues, groups });
  },
};
