const Channel = require('./Channel');

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
}

module.exports = Channel;