/* eslint-disable camelcase */
import User from '../models/User';
import Role from '../models/Role';
import EncryptorService from '../services/EncryptorService';

module.exports = {
  async index(req, res) {
    const users = await User.findAll(
      {
        include: [
          {
            model: Role,
            as: 'roles',
            attributes: ['id', 'name', 'identifier'],
            through: { attributes: [] },
          },
        ],
      },
      { raw: true },
    );

    return res.json(users);
  },

  async store(req, res) {
    const {
      name,
      email,
      login,
      password,
      role_ids,
    } = req.body;

    const user = await User.create({
      name,
      email,
      login,
      password: EncryptorService.hashPassword(password),
    });

    role_ids.forEach(async (role_id) => {
      await user.addRole(role_id);
    });

    delete user.dataValues.password;

    return res.json(user);
  },

  async user(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: [
        {
          model: Role,
          as: 'roles',
          attributes: ['id', 'name', 'identifier'],
          through: { attributes: [] },
        },
      ],
    });

    if (!user) {
      return res.status(502).json({ error: 'User not found' });
    }

    return res.json(user);
  },

  async changePassword(req, res) {
    const { user_id } = req.params;
    const { password, new_password } = req.body;

    const user = await User.findByPk(user_id, {
      attributes: {
        include: ['password'],
      },
    });

    // TODO check limit time after creation to change password

    if (!user) {
      return res.status(502).json({ error: 'User not found' });
    }

    if (user && EncryptorService.comparePassword(password, user)) {
      const updateResult = await User.update(
        {
          password: EncryptorService.hashPassword(new_password),
          active: true,
        },
        {
          returning: true,
          where: { id: user_id },
        },
      );

      const updatedUser = updateResult[1][0].dataValues;
      delete updatedUser.password;

      return res.json(updatedUser);
    }

    return res.status(401).json({ error: 'invalid-credentials' });
  },

  async delete(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(502).json({ error: 'User not found' });
    }

    await User.destroy({ where: { id: user_id } });

    return res.status(204).json();
  },
};
