const Channel = require('./Channel');

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

        return this.client.rest.post(`/channels/${this.id}/messages`, payload).then(m => new Message)
    }

    async sendFile() {

    }

}