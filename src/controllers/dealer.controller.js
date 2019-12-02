const mongoose = require('mongoose');
const Dealer = mongoose.model('Dealer');
const jwt = require('../config/jwt');

module.exports = {
    /**
     * Create a Dealer. 
     * @param {*} req req.body object with the fields. 
     * @param {*} res request response.
     * @returns Dealer
     */
    async create(req, res) {
        try {
            const dealer = await Dealer.create(req.body)

            return res.json({
                dealer,
                token: jwt.generateToken(dealer.id)
            });
        } catch (err) {
            return res.status(400).send({ error: err })
        }
    }
}