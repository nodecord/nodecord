const User = require('./User');

/**
 * Represents a Discord text message
 */
class Message {
    /**
     * Create a new message
     * @param {*} client An existing client
     * @param {object} obj The message object to create this message from
     * @param {object} guildObj The guild object for this message
     */
    constructor(client, obj, guild = undefined, channel = undefined) {
        this.id = obj.id;

        this.content = obj.content;
        this.guild = guild;
        this.channel = channel; // TODO: create TextChannel() (text channel)

        if (obj.webhook_id) {
            this.webhook = true;
            this.author = obj.webhook_id; // TODO: create User() (possibly?)
        } else {
            this.webhook = false;
            this.author = new User(client, obj.author);
        }
    }
}

module.exports = Message;