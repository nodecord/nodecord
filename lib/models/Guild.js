/**
 * Represents a Discord guild, known as a "server"
 */
class Guild {
    /**
     * Create a new guild
     * @param {*} client An existing client
     * @param {object} obj The guild object to create this guild from
     */
    constructor(client, obj) {
        this.id = obj.id;
        
        this._permissions = obj.permissions;

        this.name = obj.name;
        this.owner = obj.owner_id;
        this.region = obj.region.id;
        this.roles = obj.roles;
        this.emojis = obj.emojis;
        this.features = obj.features;
        this.verificationLevel = obj.verification_level;
        this.explicitContentFilter = obj.explicit_content_filter;
        this.twoFactorRequired = obj.mfa_level === 1 ? true : false;
        this.iconHash = obj.icon || null;
    }
}

module.exports = Guild;