const express = require('express');
const routes = express.Router();
const PurchaseController = require('../controllers/purchase.controller');
const authMiddleware = require('../middlewares/auth')

routes.use(authMiddleware);

// routes
routes.post("", PurchaseController.create)


module.exports = routes