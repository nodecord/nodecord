const Channel = require('./Channel');
const Message = require('./Message');

/**
 * Represents a Discord text channel
 */
class TextChannel extends Channel {
    /**
     * Create a new text channel
     * @param {*} client An existing client
     * @param {object} obj The channel object to create this text channel from
     */
    constructor(client, obj, guild = undefined) {
        super(client, obj);

        this.slowmode = {
            enabled: obj.rate_limit_per_user !== null ? true : false,
            seconds: obj.rate_limit_per_user || null
        };
        this.nsfw = obj.nsfw;
        this.topic = obj.topic;
        this.lastMessageID = obj.last_message_id || null;
        this.categoryID = obj.parent_id;

        this.guild = guild || null;
    }

    /**
     * Create a new message in the channel
     * @param {string|object} message Either a string containing a message, or an object containing message properties
     */
    async send(message) {
        const obj = {}

        if (typeof (message) === 'string') {
            obj.content = message;
        }

        if (typeof (message) === 'object') {
            obj.content = message.content;
        }

        const response = await this.client.rest.post(`/channels/${this.id}/messages`, obj);

        const msg = new Message(this.client, response);

        return msg;
    }
}

module.exports = TextChannel;