const MessageUtil = require('../util/Message/MessageUtil');
const Guild = require('./Guild'), TextChannel = require('./TextChannel');

module.exports = class Message {
    constructor(obj, addons, client) {
        const blacklisted = {
            'guild_id': true,
            'channel_id': true,
        };

        for (const [key, value] of Object.entries(obj)) {
            if (!blacklisted.hasOwnProperty(key)) this[key] = value;
        }

        this.cleanedContent = MessageUtil.cleanMessage(obj.content);
        this.guild = new Guild(addons.guild);
        this.channel = new TextChannel(addons.channel, client);
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