const express = require('express');
const routes = express.Router();

const DealerController = require('../controllers/dealer.controller');

const authMiddleware = require('../middlewares/auth')
    // routes.use(authMiddleware);

routes.post("/dealers", DealerController.create)


module.exports = routes