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
                });

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
            return res.status(400).send({ error: err });
        }
    },
    /**
     * delete a purchase. 
     * @param {*} req request. 
     * @param {*} res request response.
     * @returns void
     */
    async delete(req, res) {
        try {
            const userId = req.userId;
            const purchaseId = req.params.id;
            const cpf = await getCpf(userId);

            if (!cpf)
                return res.status(400).send({ error: cpf });

            Purchase.deleteOne({ _id: purchaseId, status: 'Em validação', cpf })
                .then((data) => {
                    return data.deletedCount > 0 ? res.json() : res.status(400).send({ error: 'access denied.' });
                });

        } catch (err) {
            return res.status(400).send({ error: err });
        }
    },


    /**
     * get a purchase. 
     * @param {*} req request. 
     * @param {*} res request response.
     * @returns Purchase
     */
    async getPurchase(req, res) {
        try {
            const purchaseId = req.params.id;
            let purchase = await Purchase.findById(purchaseId);

            const cashback = calculateCashback(purchase.total);
            purchase.cashback = cashback.value;
            purchase.percentage = cashback.percentage;
            console.log(cashback)
            console.log(purchase.cashback)
            return res.json(purchase);
        } catch (err) {
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
 * get the purchase status.
 * @param {String} cpf user cpf.
 * @returns String
 */
function getStatus(cpf) {
    return cpf === '153.509.460-56' ? 'Aprovado' : 'Em validação';
}

/**
 * calculates the cashback of the purchase.
 * @param {number} total 
 * @returns Object
 */
function calculateCashback(total) {
    try {
        if (total <= 999) {
            let p = 10;
            return { percentage: `${p}%`, value: total * (p / 100) };
        } else if (total >= 1000 && total <= 1500) {
            let p = 15;
            return { percentage: `${p}%`, value: total * (p / 100) };
        } else {
            let p = 20;
            return { percentage: `${p}%`, value: total * (p / 100) };
        }
    } catch (e) {
        return { percentage: '0%', value: 0 };
    }
}