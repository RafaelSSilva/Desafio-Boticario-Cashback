const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PurchaseSchema = new Schema({
    code: { type: String, required: true },
    total: { type: Number, required: true },
    date: { type: Date, required: true },
    cpf: { type: String, required: true, max: 100 },
    status: { type: String, required: true },
    credit: { type: Number, required: false },
    percentage: { type: String, required: false }
});

// exports the Purcase model.
module.exports = mongoose.model('Purchase', PurchaseSchema);