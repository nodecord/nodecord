const Collection = require('../Collection');

/**
 * A special Collection for storing and working with audit log entries. Also used for entry changes.
 */
class AuditLogEntryStore extends Collection {
    /**
     * Create a new AuditLogEntryStore
     * @param {Collection|Map} iterable An existing Collection or Map
     */
    constructor(client, iterable) {
        super(iterable);

        this.client = client;
    }
}

module.exports = AuditLogEntryStore;