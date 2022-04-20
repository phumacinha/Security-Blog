import express from 'express';

import ACLChecking from './middlewares/aclChecking';

import RoleController from './controllers/RoleController';
import UserController from './controllers/UserController';
import PostController from './controllers/PostController';
// import AdventureTypeController from './controllers/AdventureTypeController';
// import AdventureController from './controllers/AdventureController';
// import SubscriptionController from './controllers/SubscriptionController';
// import AuthController from './controllers/AuthController';

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
// routes.post('/users/:user_id/aventura', AdventureController.store);
// routes.get('/users/:user_id/aventura', AdventureController.adventures);
// routes.put('/aventura/:adventure_id', AdventureController.update);
// routes.delete('/aventura/:adventure_id', AdventureController.delete);

// routes.get('/tipo-aventura', AdventureTypeController.index);
// routes.post('/tipo-aventura', AdventureTypeController.store);

// routes.post('/users/:user_id/subscription', SubscriptionController.store);
// routes.get('/users/:user_id/subscription', SubscriptionController.index);
// routes.get(
//   '/aventura/:adventure_id/subscription',
//   SubscriptionController.adventures,
// );
// routes.put('/subscription/:subscription_id', SubscriptionController.update);
// routes.delete('/subscription/:subscription_id', SubscriptionController.delete);

module.exports = routes;
