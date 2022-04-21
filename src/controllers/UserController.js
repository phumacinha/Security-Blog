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

  async requestCreation(req, res) {
    const { email } = req.body;

    const userWithInformedEmail = await User.findOne({ where: { email } });

    if (userWithInformedEmail) {
      console.log('Alguém tentou criar um usuário com seu e-mail. Se você esqueceu sua senha, redefina-a em <link>. Caso contrário, apenas desconsidere o e-mail.');
    } else {
      const creationToken = EncryptorService.generateToken(email, '1 day');
      console.log(`Para continuar o cadastro do usuário com seu e-mail, acesse o link: ${creationToken}. Caso contrário, apenas desconsidere o e-mail.`);
    }

    return res.status(204).json();
  },

  async store(req, res) {
    const {
      name,
      email,
      password,
      role_ids: roleIds,
    } = req.body;

    const userWithInformedEmail = await User.findOne({ where: { email } });

    if (userWithInformedEmail) {
      return res.status(400).json({ error: 'Something went wrong.' });
    }

    const roles = await Promise.all(roleIds.map(async (roleId) => {
      const role = await Role.findByPk(roleId);
      return role;
    }));
    const someRoleIsInvalid = roles.some((role) => !role);

    if (someRoleIsInvalid) {
      return res.status(400).json({ error: 'some role id is invalid' });
    }

    const user = await User.create({
      name,
      email,
      password: EncryptorService.hashPassword(password),
    });
    await user.addRoles(roleIds);

    return res.json(await User.findByPk(user.id));
  },

  async user(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  },

  async updateRoles(req, res) {
    const { user_id } = req.params;
    const { role_ids } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }

    try {
      await user.setRoles(role_ids);
    } catch (e) {
      return res.status(400).json({ error: 'some role id is invalid' });
    }

    return res.json(await User.findByPk(user_id));
  },

  async delete(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await User.destroy({ where: { id: user_id } });

    return res.status(204).json();
  },
};
