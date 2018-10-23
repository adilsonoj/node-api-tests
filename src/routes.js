const express = require('express');
const routes = express.Router();
const authMiddleware = require('./app/middlewares/auth');

const ProductController = require('./app/controllers/ProductController');
const AuthController = require('./app/controllers/AuthController');
const ProjectController = require('./app/controllers/ProjectController');

routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.destroy);

routes.post('/register',  AuthController.register);
routes.post('/authenticate',  AuthController.authenticate);

//usando middleware. routes.use(authMiddleware)
routes.get('/projects', authMiddleware, ProjectController.projects);

routes.post('/forgot_password',  AuthController.forgotPassword);
routes.post('/reset_password',  AuthController.resetPassword);

module.exports = routes;