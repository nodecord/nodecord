const AuditLogEntryStore = require('../util/Stores/AuditLogEntry');
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
        this.entries = obj.audit_log_entries;
        this.integrations = obj.integrations;
    }
}

module.exports = AuditLog;