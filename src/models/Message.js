const MessageUtil = require('../util/Message/MessageUtil');
const MessageEmbed = require('../util/Message/MessageEmbed');
const Guild = require('./Guild'), TextChannel = require('./TextChannel');

module.exports = class Message {
    constructor(obj, client) {
        Object.defineProperty(this, "client", { value: client });
        this.id = obj.id;
        if (obj.webhook_id) {
            this.author = obj.webhook_id;
        } else {
            this.author = obj.author;
            this.member = obj.member;
        }
        this.content = obj.content;
        this.cleaned = MessageUtil.cleanMessage(obj.content);
        this.createdAt = new Date(obj.timestamp);
        if (obj.edited_timestamp) this.editedAt = new Date(obj.edited_timestamp);
        this.tts = obj.tts;
        this.pinned = obj.pinned;
        this.mentions = obj.mentions;
        this.attachments = obj.attachments;
        this.embeds = obj.embeds;
        this.reactions = obj.reactions;
        this.guild = obj.guild_id ? new Guild(obj.guild_id) : null;
        this.channel = new TextChannel(obj.channel_id, client);
    }

    async delete(timeout) {
        if (timeout && typeof (timeout) == 'number') {
            setTimeout(() => {
                this.client.rest.delete(`/channels/${this.channel.id}/messages/${this.id}`)
                    .then(() => Promise.resolve(this))
                    .catch(e => Promise.reject(e));
            });
        } else {
            return this.client.rest.delete(`/channels/${this.channel.id}/messages/${this.id}`)
                .then(() => Promise.resolve(this))
                .catch(e => Promise.reject(e));
        }
    }

    async edit(content) {
        if (content instanceof MessageEmbed) {
            content = content.pack();
            return this.client.rest.patch(`/channels/${this.channel.id}/messages/${this.id}`)
        }
    }
}