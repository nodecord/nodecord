const Collection = require('../Collection');

/**
 * A special Collection for storing and working with roles
 */
class RoleStore extends Collection {
    /**
     * Create a new RoleStore
     * @param {Collection|Map} iterable An existing Collection or Map
     */
    constructor(client, iterable) {
        super(iterable);

        this.client = client;
    }
}

module.exports = RoleStore;