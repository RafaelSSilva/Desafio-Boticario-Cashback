const express = require('express');
const routes = express.Router();

const AuthController = require('../controllers/auth.controller');

// routers
routes.post("/", AuthController.authenticate);


module.exports = routes;