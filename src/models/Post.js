/* eslint-disable no-param-reassign */
import { Model, DataTypes } from 'sequelize';
import User from './User';
import Comment from './Comment';
import { escapeHTML } from '../services/sanitizeService';

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: DataTypes.STRING,
          validate: {
            len: {
              args: [1, 128],
              get msg() {
                return `post title must be between ${this.args[0]} and ${this.args[1]} characters long`;
              },
            },
          },
        },
        content: {
          type: DataTypes.TEXT,
          validate: {
            len: {
              args: [1, 1024],
              get msg() {
                return `post content must be between ${this.args[0]} and ${this.args[1]} characters long`;
              },
            },
          },
        },
      },
      {
        hooks: {
          beforeSave(post) {
            post.title = escapeHTML(post.title);
            post.content = escapeHTML(post.content);
          },
        },
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
              { model: Comment.scope('embedded'), as: 'comments' },
            ],
            order: [
              ['comments', 'created_at', 'desc'],
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
