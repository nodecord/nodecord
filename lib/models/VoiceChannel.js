const Channel = require('./Channel');

/**
 * Represents a Discord voice channel
 */
class VoiceChannel extends Channel {
    /**
     * Create a new voice channel
     * @param {*} client An existing client
     * @param {object} obj The channel object to create this voice channel from
     */
    constructor(client, obj, guild = undefined) {
        super(client, obj, guild);

        this.bitrate = obj.bitrate;
        this.userLimit = obj.user_limit;
    }
}

module.exports = VoiceChannel;