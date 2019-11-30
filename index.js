const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const requireDir = require('require-dir')

// Configure DB access.
const uri = 'mongodb+srv://admin:admin@boticario-q0c5f.mongodb.net/test?retryWrites=true&w=majority';

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
    useUnifiedTopology: true,
    user: 'admin',
    password: 'admin',
};

// opens the database.
mongoose.connect(uri, options).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
        console.log('database runtime');
    },
    err => { /** handle initial connection error */
        console.log(err);
    }
);

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