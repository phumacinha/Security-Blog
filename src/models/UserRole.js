import { Model } from 'sequelize';

class UserRole extends Model {
  static init(sequelize) {
    super.init({}, { sequelize });
  }

  // static associate(models) {
  //   this.hasOne(models.User, { foreignKey: 'user_id', as: 'user' });
  //   this.hasOne(models.Role, { foreignKey: 'role_id', as: 'role' });
  // }
}

module.exports = UserRole;
