import { Model, DataTypes } from 'sequelize';

class Comment extends Model {
  static init(sequelize) {
    super.init({ content: DataTypes.TEXT }, { sequelize });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'comments' });
  }
}

module.exports = Comment;
