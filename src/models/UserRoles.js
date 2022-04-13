import { Model } from 'sequelize';

class UserRoles extends Model {
  static init(sequelize) {
    super.init({}, { sequelize });
  }

  static associate() {}
}

module.exports = UserRoles;
