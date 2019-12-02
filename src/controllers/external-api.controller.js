const axios = require('axios');

module.exports = {
    /**
     * make a request to an external API.
     * API externa GET https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf=12312312323
     * headers { token: 'ZXPURQOARHiMc6Y0flhRC1LVlZQVFRnm' }
     * @param {*} req 
     * @param {*} res 
     * @returns Object
     */
    getExternalApi(req, res) {
        try {
            const url = 'https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf=12312312323';

            axios.get(url, { headers: { token: 'ZXPURQOARHiMc6Y0flhRC1LVlZQVFRnm' } })
                .then((response) => {
                    const total = response.data.body.credit;
                    const cashback = calculateCredit(total);

                    return res.json({
                        credit: cashback.value,
                        percentage: cashback.percentage
                    });
                });

        } catch (err) {
            return res.status(400).send({ error: err });
        }
    }
}



/**
 * calculates the cridit of the purchase.
 * @param {number} total 
 * @returns Object
 */
function calculateCredit(total) {
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