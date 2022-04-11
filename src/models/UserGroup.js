import { Model } from 'sequelize';

class UserGroup extends Model {
  static init(sequelize) {
    super.init({}, { sequelize });
  }

  // static associate(models) {
  //   this.hasOne(models.User, { foreignKey: 'user_id', as: 'user' });
  //   this.hasOne(models.Group, { foreignKey: 'group_id', as: 'group' });
  // }
}

module.exports = UserGroup;
