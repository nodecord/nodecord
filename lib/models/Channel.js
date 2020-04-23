const Collection = require('../util/Collection');
const ChannelPermission = require('./ChannelPermission');

/**
 * Represents a Discord channel
 */
class Channel {
    /**
     * Create a new channel
     * @param {*} client An existing client
     * @param {object} obj The channel object to create this channel from
     * @param {object} guild The guild object for this channel
     */
    constructor(client, obj, guild) {
        this.id = obj.id;
        this.client = client;
        this.guild = guild;
        
        this.type = obj.type;
        this.position = obj.position;
        this.permissionOverwrites = new Collection();
        this.name = obj.name;

        if (obj.permission_overwrites !== undefined && obj.permission_overwrites.length) {
            for (const overwrite in obj.permission_overwrites) {
                this.permissionOverwrites.set(overwrite.id, overwrite);
            }
        }

        this.permissions = new ChannelPermission(client, this, this.guild);
    }
}

module.exports = Channel;