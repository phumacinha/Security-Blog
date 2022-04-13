import Sequelize from 'sequelize';
import dbConfig from '../config/database';

import Comment from '../models/Comment';
import Post from '../models/Post';
import Role from '../models/Role';
import User from '../models/User';
import UserRoles from '../models/UserRoles';

const connection = new Sequelize(dbConfig[process.env.NODE_ENV]);

Comment.init(connection);
Post.init(connection);
Role.init(connection);
User.init(connection);
UserRoles.init(connection);

Comment.associate(connection.models);
Post.associate(connection.models);
Role.associate(connection.models);
User.associate(connection.models);
UserRoles.associate(connection.models);

module.exports = connection;
