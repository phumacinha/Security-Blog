import { Model, DataTypes } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        login: DataTypes.STRING,
        password: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
      },
      {
        defaultScope: {
          attributes: { exclude: ['password'] },
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
