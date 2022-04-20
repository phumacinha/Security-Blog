import { Model, DataTypes } from 'sequelize';

class Role extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        identifier: DataTypes.STRING,
      },
      {
        defaultScope: {
          attributes: { exclude: ['updatedAt', 'createdAt'] },
        },
        sequelize,
      },
    );
  }

  static associate() {}
}

module.exports = Role;
