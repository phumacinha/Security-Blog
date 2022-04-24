/* eslint-disable camelcase */
import Role from '../models/Role';

module.exports = {
  async index(req, res) {
    try {
      const roles = await Role.findAll();
      return res.json(roles);
    } catch (e) {
      return res.status(500).json({ errors: ['unexpected error'] });
    }
  },

  async store(req, res) {
    const { name, identifier } = req.body;

    try {
      const role = await Role.create({ name, identifier });

      return res.json(role);
    } catch (e) {
      return res.status(500).json({ errors: ['unexpected error'] });
    }
  },

  async update(req, res) {
    const { id, name, identifier } = req.body;

    try {
      const role = await Role.update({ name, identifier }, {
        returning: true,
        where: { id },
      });

      return res.json(role[1][0]);
    } catch (e) {
      return res.status(500).json({ errors: ['unexpected error'] });
    }
  },

  async delete(req, res) {
    const { role_id } = req.params;

    try {
      const role = await Role.findByPk(role_id);

      if (!role) {
        return res.status(404).json({ errors: ['role not found'] });
      }

      await Role.destroy({ where: { id: role_id } });

      return res.status(204).json();
    } catch (e) {
      return res.status(500).json({ errors: ['unexpected error'] });
    }
  },
};
