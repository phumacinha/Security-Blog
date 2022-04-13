import { Model, DataTypes } from 'sequelize';

class Role extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      identifier: DataTypes.STRING,
    }, { sequelize });
  }

  static associate() {}
}

module.exports = Role;
