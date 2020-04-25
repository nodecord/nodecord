const AuditLogEntryStore = require('../util/Stores/AuditLogEntryStore');
const AuditLogEntry = require('./AuditLogEntry');

/**
 * Represents a Discord guild's audit log object
 */
class AuditLog {
    /**
     * Create a new audit log
     * @param {*} client An existing client
     * @param {object} obj The audit log object to create this audit log from
     */
    constructor(client, obj) {
        // TODO: --- create respective stores/classes for all ---
        this.webhooks = obj.webhooks;
        this.users = obj.users;
        this.entries = new AuditLogEntryStore();
        this.integrations = obj.integrations;

        if (obj.audit_log_entries !== undefined && obj.audit_log_entries.length) {
            for (const entry of obj.audit_log_entries) {
                this.entries.set(entry.id, new AuditLogEntry(client, entry));
            }
        }
    }
}

module.exports = AuditLog;