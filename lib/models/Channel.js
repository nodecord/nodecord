/**
 * Represents a Discord channel
 */
class Channel {
    /**
     * Create a new channel
     * @param {*} client An existing client
     * @param {object} obj The channel object to create this channel from
     */
    constructor(client, obj) {
        this.id = obj.id;
        this.client = client;
        
        this.type = obj.type;
        this.position = obj.position;
        this.permissionOverwrites = obj.permission_overwrites;
        this.name = obj.name;
    }
}

module.exports = Channel;