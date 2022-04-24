import { Model, DataTypes } from 'sequelize';
import Role from './Role';

import EncryptorService from '../services/EncryptorService';
import { isValidName, isEmail, isStrongPassword } from '../services/validationService';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          validate: { isValidName, len: [1, 128] },
        },
        email: {
          type: DataTypes.STRING,
          validate: { isEmail, len: [5, 128] },
        },
        password: {
          type: DataTypes.STRING,
          validate: { isStrongPassword },
        },
      },
      {
        hooks: {
          afterValidate: (user, options) => {
            if (options.fields.includes('password')) {
              // eslint-disable-next-line no-param-reassign
              user.password = EncryptorService.hashPassword(user.password);
            }
          },
        },
        defaultScope: {
          attributes: { exclude: ['password'] },
          include: [
            {
              model: Role,
              as: 'roles',
              through: { attributes: [] },
            },
          ],
        },
        scopes: {
          identification: { attributes: ['id', 'name'] },
        },
        sequelize,
      },
    );
  }

  static associate(models) {
    this.hasMany(models.Post, { foreignKey: 'user_id', as: 'posts' });
    this.belongsToMany(models.Role, {
      through: models.UserRoles, foreignKey: 'user_id', otherKey: 'role_id', as: 'roles',
    });
  }
}

module.exports = User;
