const Request = require('phin');
const { baseURL } = require('../util/Constants');

module.exports = async (token) => {
    try {
        const { body } = await Request({
            url: `${baseURL}/gateway/bot`,
            parse: 'json',
            headers: {
                'Authorization': `Bot ${token}`
            }
        });

        return body.url;
    } catch(err) {
        throw new Error(err);
    }
}