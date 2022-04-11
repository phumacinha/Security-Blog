import { Model, DataTypes } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        login: DataTypes.STRING,
        password: DataTypes.STRING,
        roles: DataTypes.ARRAY(DataTypes.INTEGER),
      },
      {
        defaultScope: {
          attributes: { exclude: ['password', 'roles'] },
        },
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsToMany(models.Role, { through: 'users_roles', foreignKey: 'user_id', as: 'roles' });
  }
}

module.exports = User;
