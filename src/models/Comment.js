/* eslint-disable no-param-reassign */
import { Model, DataTypes } from 'sequelize';
import User from './User';
import { escapeHTML } from '../services/sanitizeService';

class Comment extends Model {
  static init(sequelize) {
    super.init({
      content: {
        type: DataTypes.TEXT,
        validate: {
          len: {
            args: [1, 256],
            get msg() { return `comment must be between ${this.args[0]} and ${this.args[1]} characters long`; },
          },
        },
      },
    }, {
      hooks: {
        beforeSave(comment) {
          comment.content = escapeHTML(comment.content);
        },
      },
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
