const blacklisted = {
    'guild_id': true,
    'channel_id': true,
};

const MessageUtil = require('../util/MessageUtil');

module.exports = class Message {
    constructor(obj, addons) {
        for (const [key, value] of Object.entries(obj)) {
            if (!blacklisted.hasOwnProperty(key)) this[key] = value;
        }

        this.cleanedContent = MessageUtil.cleanMessage(obj.content);
        this.guild = addons.guild;
        this.channel = addons.guild;
    }

    async delete(timeout) {
        if (timeout && typeof (timeout) == 'number') {
            
        } else {

        }
    }

    async edit(newContent) {
        // to be added
    }
}