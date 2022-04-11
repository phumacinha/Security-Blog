import express from 'express';
import cors from 'cors';

import routes from './routes';

import authMiddleware from './middlewares/auth';

import './database';

import AuthController from './controllers/AuthController';
import UserController from './controllers/UserController';

const app = express();

app.use(cors());
app.use(express.json());

app.options('*', cors());

// app.post('/users', UserController.store);
// app.post('/login', AuthController.login);

// app.use('/', authMiddleware);

app.use(routes);

app.listen(3000, () => console.log('Listening...'));
