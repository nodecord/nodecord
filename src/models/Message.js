const blacklisted = {
    'guild_id': true,
    'channel_id': true,
};

const { cleanMessage } = require('../util/MessageUtil');

module.exports = class Message {
    constructor(obj, addons) {
        let cleaned = await cleanMessage(obj.content);
        
        for (const [key, value] of Object.entries(src)) {
            if (!blacklisted.hasOwnProperty(key)) this[key] = value;
        }

        this.cleanedContent = cleaned;
        this.guild = addons.guild;
        this.channel = addons.guild;
    }

    async delete(timeout) {
        // to be added
    }

    async edit(newContent) {
        // to be added
    }
}