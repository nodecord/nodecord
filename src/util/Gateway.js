const p = require('phin').promisified;

exports.getGatewayBot = async (token) => {
    if (!token || typeof(token) != 'string' || token == '') throw new Error(`INVALID_OR_NO_TOKEN`);

    try {
        const b = await p({
            url: 'https://discordapp.com/api/gateway/bot',
            parse: 'json',
            headers: {
                'Authorization': `Bot ${token}`
            }
        });

        return b.body.url;
    } catch(err) {
        throw new Error(err);
    }
}