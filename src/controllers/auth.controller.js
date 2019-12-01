const mongoose = require('mongoose');
const Dealer = mongoose.model('Dealer');
const bcrypt = require('bcryptjs');
const jwt = require('../config/jwt');


module.exports = {
    async authenticate(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        const user = await Dealer.findOne({ email }).select('+password');

        if (!user)
            return res.status(400).send({ error: 'User not found.' });

        if (!await bcrypt.compare(password, user.password))
            return res.status(400).send({ error: 'Invalid password.' });

        user.password = undefined;

        return res.send({ user, token: jwt.generateToken(user.id) });
    }
}