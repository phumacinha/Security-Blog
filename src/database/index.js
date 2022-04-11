import Sequelize from 'sequelize';
import dbConfig from '../config/database';

import Role from '../models/Role';
import User from '../models/User';
import UserRole from '../models/UserRole';
import Post from '../models/Post';
import Comment from '../models/Comment';

const connection = new Sequelize(dbConfig[process.env.NODE_ENV]);

Role.init(connection);
User.init(connection);
UserRole.init(connection);
Post.init(connection);
Comment.init(connection);

Role.associate(connection.models);
User.associate(connection.models);
Post.associate(connection.models);
Comment.associate(connection.models);

module.exports = connection;
