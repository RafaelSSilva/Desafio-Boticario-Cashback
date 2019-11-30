const express = require('express');
require('./src/database/index');
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

// routes
// const Dealer = require('./src/models/dealer.model');

app.use('/api', require('./src/routes/dealer.route'))