const Collection = require('../Collection');

/**
 * A special Collection for storing and working with reactions
 */
class ReactionStore extends Collection {
    /**
     * Create a new ReactionStore
     * @param {Collection|Map} iterable An existing Collection or Map
     */
    constructor(client, iterable) {
        super(iterable);

        this.client = client;
    }
}

module.exports = ReactionStore;