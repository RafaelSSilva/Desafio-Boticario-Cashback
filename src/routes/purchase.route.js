const express = require('express');
const routes = express.Router();
const PurchaseController = require('../controllers/purchase.controller');
const authMiddleware = require('../middlewares/auth')

routes.use(authMiddleware);

// routes
routes.post("", PurchaseController.create);
routes.put("/:id", PurchaseController.update);
routes.delete("/:id", PurchaseController.delete);

// routes export
module.exports = routes;