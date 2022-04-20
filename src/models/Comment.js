import { Model, DataTypes } from 'sequelize';
import User from './User';

class Comment extends Model {
  static init(sequelize) {
    super.init({
      content: DataTypes.TEXT,
      createdAt: DataTypes.DATE,
    }, {
      scopes: {
        embedded: {
          attributes: ['id', 'content', 'createdAt'],
          include: [{ model: User, as: 'user' }],
        },
      },
      sequelize,
    });
  }

  static associate(models) {
    this.belongsTo(models.User.scope('identification'), { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'comments' });
  }
}

module.exports = Comment;
