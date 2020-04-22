const ReactionStore = require('../util/Stores/ReactionStore');
const Reaction = require('./Reaction');

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
        this.pinned = obj.pinned;
        this.reference = obj.message_reference || null; // TODO: restructure
        this.type = obj.type;
        
        this.guild = guild;
        this.channel = channel;
        this.member = !guild ? null : guild.members.get(user.id);
        this.reactions = new ReactionStore();

        if (obj.webhook_id) {
            this.webhook = true;
            this.author = obj.webhook_id; // TODO: create User() (possibly?)
        } else {
            this.webhook = false;
            this.author = user;
        }

        for (const reaction of obj.reactions) {
            this.reactions.set(reaction.emoji.id, new Reaction(client, reaction));
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

        const response = await this.client.rest.patch(`/channels/${this.channel.id}/messages/${this.id}`, obj);

        this.content = response.content;

        return this;
    }

    /**
     * Delete the message
     */
    async delete() {
        await this.client.rest.delete(`/channels/${this.channel.id}/messages/${this.id}`);

        return true;
    }

    /**
     * React to the message with a unicode or custom emoji
     * @param {string} emoji A string containing either a unicode emoji or the ID of a custom emoji
     */
    async react(emoji) {
        
    }
}

module.exports = Message;