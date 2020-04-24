const AuditLogEntryStore = require('../util/Stores/AuditLogEntry');
const AuditLogEntryChange = require('./AuditLogEntryChange');

/**
 * Represents a Discord audit log entry
 */
class AuditLogEntry {
    /**
     * Create a new audit log entry
     * @param {*} client An existing client
     * @param {object} obj The audit log entry object to create this audit log entry from
     */
    constructor(client, obj) {
        this.id = obj.id;

        this.targetID = obj.target_id;
        this.changes = new AuditLogEntryStore(); // TODO: class for this
        this.userID = obj.obj.user_id;
        this.actionType = obj.action_type;
        this.options = obj.options || null;
        this.reason = obj.reason || null;

        for (const change of obj.changes) {
            this.changes.set(change.key, new AuditLogEntryChange(client, change));
        }
    }
}

module.exports = AuditLogEntry;