import Sequelize from 'sequelize';
import dbConfig from '../config/database';

import Group from '../models/Group';
import User from '../models/User';
import UserGroup from '../models/UserGroup';
import Post from '../models/Post';
import Comment from '../models/Comment';

const connection = new Sequelize(dbConfig[process.env.NODE_ENV]);

Group.init(connection);
User.init(connection);
UserGroup.init(connection);
Post.init(connection);
Comment.init(connection);

Group.associate(connection.models);
User.associate(connection.models);
Post.associate(connection.models);
Comment.associate(connection.models);

module.exports = connection;
