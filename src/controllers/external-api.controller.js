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
                    const credit = response.data.body.credit;

                    return res.json({
                        credit: credit,
                    });
                });

        } catch (err) {
            return res.status(400).send({ error: err });
        }
    }
}