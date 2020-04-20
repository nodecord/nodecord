const Request = require('phin');

module.exports = async (token) => {
    try {
        const { body } = await Request({
            url: 'https://discordapp.com/api/gateway/bot',
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