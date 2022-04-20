import { Model, DataTypes } from 'sequelize';
import Role from './Role';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
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

    // this.addScope('lessInformation', { attributes: ['id', 'name'] });
  }
}

module.exports = User;
