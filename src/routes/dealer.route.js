const express = require('express');
const routes = express.Router();

const DealerController = require('../controllers/dealer.controller')

routes.post("/dealers", DealerController.create)


module.exports = routes