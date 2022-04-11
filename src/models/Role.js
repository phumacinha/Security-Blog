import { Model, DataTypes } from 'sequelize';

class Role extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      identifier: DataTypes.STRING,
    }, { sequelize });
  }

  static associate(models) {
    this.belongsToMany(models.Role, { through: 'users_roles', foreignKey: 'role_id', as: 'roles' });
  }
}

module.exports = Role;
