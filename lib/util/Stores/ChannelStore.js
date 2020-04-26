const Collection = require('../Collection');

/**
 * A special Collection for storing and working with channels
 */
class ChannelStore extends Collection {
    /**
     * Create a new ChannelStore
     * @param {Collection|Map} iterable An existing Collection or Map
     */
    constructor(client, iterable, guild) {
        super(iterable);

        this.client = client;
    }

    /**
     * Returns a full channel if it belongs to the guild, otherwise fetching and returning a partial channel from Discord
     * @param {string} id The channel ID to fetch
     */
    fetch(id) {
        let channel = this.get(id);

        if (!channel) channel = await this.client.rest.get(`/channels/${id}`);
        else return channel;

        if (!channel) return null;
        else return channel;
    }

    /**
     * Create a new channel
     * @param {string} name The name of the channel
     * @param {string} type One of the following types: TEXT, VOICE, CATEGORY
     * @param {*} options 
     */
    create(name, type, options = {}) {

    }
}

module.exports = ChannelStore;