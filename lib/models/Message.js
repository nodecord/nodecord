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
    constructor(client, obj, user = undefined, guild = undefined, channel = undefined) {
        this.id = obj.id;
        this.client = client;

        this._nonce = obj.nonce;

        this.content = obj.content;
        this.createdAt = new Date(obj.timestamp);
        this.editedAt = obj.edited_timestamp ? new Date(obj.edited_timestamp) : null;
        this.tts = obj.tts;
        this.mentionsEveryone = obj.mentions_everyone;
        this.mentions = {
            users: null,
            roles: null,
            channels: null
        }
        this.attachments = obj.attachments;
        this.embeds = obj.embeds;
        this.reactions = obj.reactions;
        this.pinned = obj.pinned;
        this.reference = obj.message_reference || null; // TODO: restructure
        this.type = obj.type;
        
        this.guild = guild;
        this.channel = channel; // TODO: create Channel() (text channel)
        this.member = null; // TODO: guild member

        if (obj.webhook_id) {
            this.webhook = true;
            this.author = obj.webhook_id; // TODO: create User() (possibly?)
        } else {
            this.webhook = false;
            this.author = user;
        }
    }
}

module.exports = Message;