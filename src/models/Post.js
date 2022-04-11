import { Model, DataTypes } from 'sequelize';

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        createdAt: DataTypes.DATE,
      },
      {
        sequelize,
      },
    );
  }

  static associate(models) {
    this.hasMany(models.Comment, { foreignKey: 'post_id', as: 'comments' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

module.exports = Post;
