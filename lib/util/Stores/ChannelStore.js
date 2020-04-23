const Collection = require('../Collection');

/**
 * A special Collection for storing and working with channels
 */
class ChannelStore extends Collection {
    /**
     * Create a new ChannelStore
     * @param {Collection|Map} iterable An existing Collection or Map
     */
    constructor(client, iterable) {
        super(iterable);

        this.client = client;
    }
}

module.exports = ChannelStore;