const Channel = require('./Channel');
const p = require('phin').promisified;

module.exports = class TextChannel extends Channel {
    constructor(obj, client) {
        super(obj, client);
    }

    async createMessage(content, extra) {
        const payload = {
            content: null,
            tts: false,
            embed: null
        };

        let options = null;

        if (typeof (content) == 'object') {
            options = content;
        } else {
            payload.content = `${content}`;
            options = extra || null;
        }

        if (options) {
            if (options.tts && typeof (options.tts) == 'boolean') payload.tts = options.tts || false;
            if (options.embed && typeof (options.embed) == 'object') payload.embed = options.embed || null;
        }

        if (payload.content && payload.content == '') throw new TypeError(`Message content cannot be empty`);
        if (payload.content && payload.content.split('').length > 2000) throw new TypeError(`Message content cannot be over 2000 characters`);

        try {
            const b = await p({
                url: `https://discordapp.com/api/channels/${this.id}/messages`,
                method: 'POST',
                headers: {
                    'Authorization': `Bot ${this.client.token}`,
                    'Content-Type': 'application/json'
                },
                data: payload
            });
    
            return JSON.parse(b.body);
        } catch(err) {
            throw new Error(err);
        }
    }
}