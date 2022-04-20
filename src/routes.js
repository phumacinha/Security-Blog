import express from 'express';

import ACLChecking from './middlewares/aclChecking';

import RoleController from './controllers/RoleController';
import UserController from './controllers/UserController';
import PostController from './controllers/PostController';
import CommentController from './controllers/CommentController';

const routes = express.Router();

routes.get('/roles', ACLChecking(['moderator']), RoleController.index);
routes.post('/roles', ACLChecking(['moderator']), RoleController.store);
routes.put('/roles', ACLChecking(['moderator']), RoleController.update);
routes.delete('/roles/:role_id', ACLChecking(['moderator']), RoleController.delete);

routes.get('/users', ACLChecking(['default', 'creator', 'moderator']), UserController.index);
routes.get('/users/:user_id', ACLChecking(['default', 'creator', 'moderator']), UserController.user);
// routes.put('/users/:user_id/changePassword', UserController.changePassword);
routes.put('/users/:user_id/updateRoles', ACLChecking(['moderator']), UserController.updateRoles);
routes.delete('/users/:user_id', ACLChecking(['moderator']), UserController.delete);

routes.post('/posts', ACLChecking(['creator', 'moderator']), PostController.store);
routes.put('/posts/:post_id', ACLChecking(['creator', 'moderator']), PostController.update);
routes.delete('/posts/:post_id', ACLChecking(['creator', 'moderator']), PostController.delete);

routes.post('/posts/:post_id/comment', ACLChecking(['default', 'creator', 'moderator']), CommentController.store);
routes.delete('/posts/:post_id/comment/:comment_id', ACLChecking(['default', 'creator', 'moderator']), CommentController.delete);

module.exports = routes;
