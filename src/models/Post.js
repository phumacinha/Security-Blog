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
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.hasMany(models.Comment, { foreignKey: 'post_id', as: 'comments' });
  }
}

module.exports = Post;
