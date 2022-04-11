import { Model, DataTypes } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        login: DataTypes.STRING,
        password: DataTypes.STRING,
        user_groups: DataTypes.ARRAY(DataTypes.INTEGER),
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
    this.belongsToMany(models.Group, { through: 'user_groups', foreignKey: 'user_id', as: 'groups' });
  }
}

module.exports = User;
