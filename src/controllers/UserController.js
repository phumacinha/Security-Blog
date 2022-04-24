/* eslint-disable camelcase */
import User from '../models/User';
import Role from '../models/Role';

import EncryptorService from '../services/EncryptorService';
import { isEmail } from '../services/validationService';

module.exports = {
  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (e) {
      return res.status(500).json({ errors: ['unexpected error'] });
    }
  },

  async requestCreation(req, res) {
    const { email } = req.body;

    try {
      if (!email || !isEmail(email, true)) {
        return res.status(400).json({ errors: ['invalid e-mail'] });
      }

      const userWithInformedEmail = await User.findOne({ where: { email } });

      if (userWithInformedEmail) {
        return res.json('Alguém tentou criar um usuário com seu e-mail. Se você esqueceu sua senha, redefina-a em <link>. Caso contrário, apenas desconsidere o e-mail.');
      // eslint-disable-next-line no-else-return
      } else {
        const creationToken = EncryptorService.generateToken(email, '1 day');
        return res.json(`Para continuar o cadastro do usuário com seu e-mail, acesse o link: ${creationToken}. Caso contrário, apenas desconsidere o e-mail.`);
      }

      // eslint-disable-next-line no-unreachable
      return res.status(204).json();
    } catch (e) {
      return res.status(500).json({ errors: ['unexpected error'] });
    }
  },

  async store(req, res) {
    const {
      name,
      email,
      password,
    } = req.body;

    try {
      const userWithInformedEmail = await User.findOne({ where: { email } });

      if (userWithInformedEmail) {
        return res.status(400).json({ errors: ['something went wrong'] });
      }
      const defaultRole = await Role.findOne({ where: { identifier: 'default' } });

      const user = await User.create({
        name,
        email,
        password,
      });
      await user.addRole(defaultRole);

      return res.status(201).json(await User.findByPk(user.id));
    } catch (e) {
      const isValidationError = e?.name === 'SequelizeValidationError';
      if (isValidationError) {
        return res.status(400).json({ errors: e.errors?.map((error) => error.message) });
      }

      return res.status(500).json({ errors: ['unexpected error'] });
    }
  },

  async user(req, res) {
    const { user_id } = req.params;

    try {
      const user = await User.findByPk(user_id);

      if (!user) {
        return res.status(404).json({ errors: ['user not found'] });
      }

      return res.json(user);
    } catch (e) {
      return res.status(500).json({ errors: ['unexpected error'] });
    }
  },

  async updateRoles(req, res) {
    const { user_id } = req.params;
    const { role_ids } = req.body;

    try {
      const user = await User.findByPk(user_id);

      if (!user) {
        return res.status(404).json({ errors: ['user not found'] });
      }

      await user.setRoles(role_ids);

      return res.json(await User.findByPk(user_id));
    } catch (e) {
      return res.status(500).json({ errors: ['unexpected error'] });
    }
  },

  async delete(req, res) {
    const { user_id } = req.params;

    try {
      const user = await User.findByPk(user_id);

      if (!user) {
        return res.status(404).json({ errors: ['user not found'] });
      }

      await User.destroy({ where: { id: user_id } });

      return res.status(204).json();
    } catch (e) {
      return res.status(500).json({ errors: ['unexpected error'] });
    }
  },
};
