import Group from '../models/Group';

module.exports = {
  async index(req, res) {
    const userGroups = await Group.findAll();
    return res.json(userGroups);
  },

  async store(req, res) {
    const { name } = req.body;

    const group = await Group.create({ name });

    return res.json(group);
  },
};
