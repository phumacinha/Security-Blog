import express from 'express';
import cors from 'cors';

import routes from './routes';

import authMiddleware from './middlewares/auth';
import creationTokenChecking from './middlewares/creationTokenChecking';

import './database';

import AuthController from './controllers/AuthController';
import UserController from './controllers/UserController';
import PostController from './controllers/PostController';

const app = express();

app.use(cors());
app.use(express.json());

app.options('*', cors());

app.post('/users/requestCreation', UserController.requestCreation);
app.post('/users', creationTokenChecking, UserController.store);
app.get('/posts', PostController.index);
app.get('/posts/:post_id', PostController.post);
app.post('/login', AuthController.login);

app.use('/', authMiddleware);

app.use(routes);

app.listen(3000, () => console.log('Listening...'));
