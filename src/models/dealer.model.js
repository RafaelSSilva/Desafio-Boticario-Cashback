const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DealerSchema = new Schema({
    name: { type: String, required: true, max: 100 },
    lastName: { type: String, required: true, max: 100 },
    cpf: { type: String, required: true },
    email: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 }
});

// exports the dealer model.
module.exports = mongoose.model('Dealer', DealerSchema);