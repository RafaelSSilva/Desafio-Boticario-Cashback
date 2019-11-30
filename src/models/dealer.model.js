const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const DealerSchema = new Schema({
    name: { type: String, required: true, max: 100 },
    lastName: { type: String, required: true, max: 100 },
    cpf: { type: String, required: true },
    email: { type: String, required: true, max: 100 },
    password: { type: String, required: true, select: false }
});

// encrypt password
DealerSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

// exports the dealer model.
module.exports = mongoose.model('Dealer', DealerSchema);