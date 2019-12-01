const mongoose = require('mongoose');
const Purchase = mongoose.model('Purchase');
const Dealer = mongoose.model('Dealer');


module.exports = {
    /**
     * Create a purchase. 
     * @param {*} req req.body object with the fields code, total and date. *  ex {"code": "12dsa212123123","total": "1000", "date": "2019-01-05"}			
     * @param {*} res request response.
     * @returns Purchase
     */
    create(req, res) {
        try {
            const userId = req.userId;

            getCpf(userId)
                .then(async(cpf) => {
                    req.body.cpf = cpf;
                    req.body.status = getStatus(cpf);
                    const purchase = await Purchase.create(req.body);
                    return res.json({ purchase });
                })
                .catch((err) => {
                    return res.status(400).send({ error: err });
                })
        } catch (err) {
            return res.status(400).send({ error: err });
        }
    },
    /**
     * update a purchase. 
     * @param {*} req req.body object with the fields code, total and date. *  ex {"code": "12dsa212123123","total": "1000", "date": "2019-01-05"}			
     * @param {*} res request response.
     * @returns Purchase
     */
    async update(req, res) {
        try {
            const purchase = await Purchase.findOneAndUpdate({ _id: req.params.id, status: 'Em validação' }, { "code": req.body.code, "total": req.body.total, "date": req.body.date }, { new: true });

            if (!purchase)
                return res.status(400).send({ error: 'invalid status' });

            return res.json(purchase);
        } catch (err) {
            console.log(err)
            return res.status(400).send({ error: err });
        }
    }
}


/**
 * Get the cpf from the user.
 * @param {string} userId User ID
 * @returns String
 */
function getCpf(userId) {
    return new Promise(async(resolve, reject) => {
        await Dealer.findById(userId, function(error, data) {
            if (error)
                reject(error);

            if (!data.cpf)
                reject({ error: 'invalid cpf' });

            resolve(data.cpf);
        });
    });
}

/**
 * get the purchase status..
 * @param {String} cpf user cpf.
 * @returns String
 */
function getStatus(cpf) {
    return cpf === '153.509.460-56' ? 'Aprovado' : 'Em validação';
}