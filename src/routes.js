const express = require('express');
const routes = express.Router();
const authMiddleware = require('./middlewares/auth');

const ProductController = require('./controllers/ProductController');
const AuthController = require('./controllers/AuthController');
const ProjectController = require('./controllers/ProjectController');

routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.destroy);

routes.post('/register',  AuthController.register);
routes.post('/authenticate',  AuthController.authenticate);

//routes.use(authMiddleware);
//usando middleware
routes.get('/projects', authMiddleware, ProjectController.projects);

module.exports = routes;