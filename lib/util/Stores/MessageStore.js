const Collection = require('../Collection');

/**
 * A special Collection for storing and working with messages
 */
class MessageStore extends Collection {
    /**
     * Create a new MessageStore
     * @param {Collection|Map} iterable An existing Collection or Map
     */
    constructor(client, iterable) {
        super(iterable);

        this.client = client;
    }
}

module.exports = MessageStore;