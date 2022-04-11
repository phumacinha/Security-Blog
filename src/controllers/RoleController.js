import Role from '../models/Role';

module.exports = {
  async index(req, res) {
    const roles = await Role.findAll();
    return res.json(roles);
  },

  async store(req, res) {
    const { name } = req.body;

    const role = await Role.create({ name });

    return res.json(role);
  },
};
