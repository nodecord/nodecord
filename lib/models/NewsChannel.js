const TextChannel = require('./TextChannel');

/**
 * Represents a Discord news channel
 */
class NewsChannel extends TextChannel {
    /**
     * Create a new text channel
     * @param {*} client An existing client
     * @param {object} obj The channel object to create this news channel from
     */
    constructor(client, obj, guild = undefined) {
        super(client, obj);

        this.guild = guild || null;
    }
}

module.exports = NewsChannel;