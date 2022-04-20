import { Model, DataTypes } from 'sequelize';
import User from './User';
import Comment from './Comment';

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        createdAt: DataTypes.DATE,
      },
      {
        defaultScope: {
          attributes: { exclude: ['user_id'] },
          include: [{ model: User, as: 'author' }],
          order: [['createdAt', 'DESC']],
        },
        scopes: {
          withComments: {
            attributes: { exclude: ['user_id'] },
            include: [
              { model: User, as: 'author' },
              { model: Comment, as: 'comments', order: [['createdAt', 'DESC']] },
            ],
          },
        },
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.User.scope('identification'), { foreignKey: 'user_id', as: 'author' });
    this.hasMany(models.Comment, { foreignKey: 'post_id', as: 'comments' });
  }
}

module.exports = Post;
