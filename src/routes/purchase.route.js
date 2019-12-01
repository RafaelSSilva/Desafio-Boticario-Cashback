const express = require('express');
const routes = express.Router();
const PurchaseController = require('../controllers/purchase.controller');
const authMiddleware = require('../middlewares/auth')

routes.use(authMiddleware);

// routes
routes.post("", PurchaseController.create)
routes.put("/:id", PurchaseController.update)


module.exports = routes