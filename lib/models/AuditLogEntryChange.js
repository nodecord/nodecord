const { auditLogEntryChangeTypes } = require('../util/Constants');

/**
 * Represents a Discord audit log entry change
 */
class AuditLogEntryChange {
    /**
     * Create a new audit log entry change
     * @param {*} client An existing client
     * @param {object} obj The audit log entry change object to create this audit log entry change from
     */
    constructor(client, obj) {
        this.newValue = obj.new_value;
        this.oldValue = obj.old_value;
        this.key = obj.key;
    }

    get type() {
        return auditLogEntryChangeTypes[this.key];
    }
}

module.exports = AuditLogEntryChange;