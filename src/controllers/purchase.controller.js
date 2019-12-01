const mongoose = require('mongoose');
const Purchase = mongoose.model('Purchase');
const Dealer = mongoose.model('Dealer');


module.exports = {
    async create(req, res) {
        try {
            const userId = req.userId;

            await Dealer.findById(userId, function(error, data) {
                if (error)
                    return res.status(400).send({ error: error });

                if (!data.cpf)
                    return res.status(400).send({ error: 'invalid cpf' });

                req.body.cpf = data.cpf;
            })

            req.body.status = req.body.cpf === '153.509.460-56' ? 'Aprovado' : 'Em validação';

            const purchase = await Purchase.create(req.body);
            return res.json({ purchase });
        } catch (err) {
            return res.status(400).send({ error: err });
        }
    }
}