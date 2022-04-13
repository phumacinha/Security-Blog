import Role from '../models/Role';

module.exports = {
  async index(req, res) {
    const roles = await Role.findAll();
    return res.json(roles);
  },

  async store(req, res) {
    const { name, identifier } = req.body;

    const role = await Role.create({ name, identifier });

    return res.json(role);
  },

  async update(req, res) {
    const { id, name, identifier } = req.body;

    const role = await Role.update({ name, identifier }, {
      returning: true,
      where: { id },
    });

    return res.json(role[1][0]);
  },
};
