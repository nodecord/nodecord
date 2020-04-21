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
        this.iconHash = obj.icon || null;
        this.splashHash = obj.splash || null;
        this.discoverySplashHash = obj.discovery_splash || null;
        this.owner = obj.owner_id; // TODO: User()
        this.ownerID = obj.owner_id;
        this.region = obj.region.id;
        this.afk = {
            channel: obj.afk_channel_id || null, // TODO: Channel() (voice channel)
            timeout: obj.afk_timeout * 1000
        }
        this.widget = {
            enabled: obj.widget_channel_id,
            embeddable: obj.embed_enabled,
            channel: obj.embed_channel_id
        }
        this.verificationLevel = obj.verification_level;
        this.notificationLevel = obj.default_message_notifications;
        this.explicitContentFilter = obj.explicit_content_filter;
        this.roles = obj.roles;
        this.emojis = obj.emojis;
        this.features = obj.features;
        this.twoFactorRequired = obj.mfa_level === 1 ? true : false;
        this.systemChannel = obj.system_channel_id || null;
        
    }
}

module.exports = Guild;