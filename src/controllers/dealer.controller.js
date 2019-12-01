const mongoose = require('mongoose');
const Dealer = mongoose.model('Dealer');
const jwt = require('../config/jwt');




module.exports = {
    // async index(req, res) {
    //     const { page = 1 } = req.query
    //     const products = await Product.paginate({}, { page, limit: 5 });
    //     return res.json(products)
    // },
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
    },
    // async show(req, res) {
    //     const product = await Product.findById(req.params.id)
    //     return res.json(product)
    // },
    // async update(req, res) {
    //     const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    //     return res.json(product)
    // },
    // async destroy(req, res) {
    //     await Product.findByIdAndDelete(req.params.id)
    //     return res.json()
    // }
}