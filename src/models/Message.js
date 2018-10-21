const blacklisted = {
    'guild_id': true,
    'channel_id': true
};

module.exports = class Message {
    constructor(obj, addons) {
        for (const [key, value] of Object.entries(src)) {
            if (!blacklisted.hasOwnProperty(key)) this[key] = value;
        }
        this.guild = addons.guild;
        this.channel = addons.guild;
    }

    async delete(timeout) {
        // to be added
    }

    async edit(newContent) {
        // to be added
    }
}