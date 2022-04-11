import { Model, DataTypes } from 'sequelize';

class Group extends Model {
  static init(sequelize) {
    super.init({ name: DataTypes.STRING }, { sequelize });
  }

  static associate(models) {
    this.belongsToMany(models.Group, { through: 'user_groups', foreignKey: 'group_id', as: 'groups' });
  }
}

module.exports = Group;
