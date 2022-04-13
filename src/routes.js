import express from 'express';

import ACLChecking from './middlewares/aclChecking';

import RoleController from './controllers/RoleController';
import UserController from './controllers/UserController';
// import AdventureTypeController from './controllers/AdventureTypeController';
// import AdventureController from './controllers/AdventureController';
// import SubscriptionController from './controllers/SubscriptionController';
// import AuthController from './controllers/AuthController';

const routes = express.Router();

routes.get('/roles', RoleController.index);
routes.post('/roles', RoleController.store);
routes.put('/roles', ACLChecking(['creator']), RoleController.update);

routes.get('/users', UserController.index);
routes.get('/users/:user_id', UserController.user);
routes.put('/users/:user_id/changePassword', UserController.changePassword);
routes.post('/users', UserController.store);
routes.delete('/users/:user_id', UserController.delete);

// routes.get('/aventura', AdventureController.index);
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
