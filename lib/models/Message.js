/**
 * Represents a Discord text message
 */
class Message {
    /**
     * Create a new message
     * @param {*} client An existing client
     * @param {object} obj The message object to create this message from
     * @param {object} user The user object for this message
     * @param {object} guild The guild object for this message
     * @param {object} channel The channel object for this message
     */
    constructor(client, obj, user = undefined, guild = undefined, channel = undefined) {
        this.id = obj.id;
        this.client = client;

        this._nonce = obj.nonce || null;

        this.content = obj.content;
        this.createdAt = new Date(obj.timestamp);
        this.editedAt = obj.edited_timestamp ? new Date(obj.edited_timestamp) : null;
        this.tts = obj.tts;
        this.mentionsEveryone = obj.mention_everyone;
        this.mentions = {
            users: null,
            roles: null,
            channels: null
        }
        this.attachments = obj.attachments;
        this.embeds = obj.embeds;
        this.reactions = obj.reactions || null;
        this.pinned = obj.pinned;
        this.reference = obj.message_reference || null; // TODO: restructure
        this.type = obj.type;
        
        this.guild = guild;
        this.channel = channel;
        this.member = null; // TODO: guild member

        if (obj.webhook_id) {
            this.webhook = true;
            this.author = obj.webhook_id; // TODO: create User() (possibly?)
        } else {
            this.webhook = false;
            this.author = user;
        }
    }

    /**
     * Edit the message's content
     * @param {string|object} message Either a string containing a message, or an object containing message properties
     */
    async edit(message) {
        const obj = {}

        if (typeof (message) === 'string') {
            obj.content = message;
        }

        if (typeof (message) === 'object') {
            obj.content = message.content;
        }

        console.log(this)

        const response = await this.client.rest.patch(`/channels/${this.channel.id}/messages/${this.id}`, obj);

        this.content = response.content;

        return this;
    }

    async delete() {
        
    }
}

module.exports = Message;