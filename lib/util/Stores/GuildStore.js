const Collection = require('../Collection');

/**
 * A special Collection for storing and working with guilds
 */
class GuildStore extends Collection {
    /**
     * Create a new GuildStore
     * @param {Collection|Map} iterable An existing Collection or Map
     */
    constructor(client, iterable) {
        super(iterable);

        this.client = client;
    }
}

module.exports = GuildStore;