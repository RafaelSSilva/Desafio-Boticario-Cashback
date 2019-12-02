const express = require('express');
const routes = express.Router();
const ExternaApiController = require('../controllers/external-api.controller');
const authMiddleware = require('../middlewares/auth')

routes.use(authMiddleware);

// routes
routes.get("", ExternaApiController.getExternalApi);

// routes export
module.exports = routes;