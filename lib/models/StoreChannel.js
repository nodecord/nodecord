const Channel = require('./Channel');

/**
 * Represents a Discord store channel
 */
class StoreChannel extends Channel {
    /**
     * Create a new store channel
     * @param {*} client An existing client
     * @param {object} obj The channel object to create this store channel from
     */
    constructor(client, obj, guild = undefined) {
        super(client, obj, guild);
    }
}

module.exports = StoreChannel;