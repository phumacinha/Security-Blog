import { Model } from 'sequelize';

class UserRoles extends Model {
  static init(sequelize) {
    super.init({}, { sequelize });
  }

  static associate() {
    // this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    // this.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' });
  }
}

module.exports = UserRoles;
