const express = require('express');
require('./src/database/index'); // opens database
const cors = require('cors');
const requireDir = require('require-dir')

requireDir('./src/models')

const app = express();
app.use(express.json());
app.use(cors());
const port = 8000;

// opens the server.
app.listen(port, () => {
    console.log(`Server open on port:${port}`);
})

// define route files.
app.use('/', require('./src/routes/dealer.route'));
app.use('/authenticate', require('./src/routes/auth.route'));
app.use('/purchases', require('./src/routes/purchase.route'));
app.use('/external-api', require('./src/routes/external-api.route'));