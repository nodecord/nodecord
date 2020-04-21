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
            timeout: obj.afk_timeout
        }
        this.widget = {
            enabled: obj.widget_channel_id,
            embeddable: obj.embed_enabled,
            channel: obj.embed_channel_id // TODO: Channel() (text channel)
        }
        this.verificationLevel = obj.verification_level;
        this.notificationLevel = obj.default_message_notifications;
        this.explicitContentFilter = obj.explicit_content_filter;
        this.roles = obj.roles;
        this.emojis = obj.emojis;
        this.features = obj.features;
        this.twoFactorRequired = obj.mfa_level === 1 ? true : false;
        this.system = {
            channel: obj.system_channel_id || null, // TODO: Channel() (text channel)
            flags: obj.system_flags
        }
        this.rulesChannel = obj.rules_channel_id; // TODO: Channel() (text channel)
        this.joinedAt = new Date(obj.joined_at);
        this.large = obj.large;
        this.memberCount = obj.member_count;
        this.maxPresences = obj.max_presences;
        this.maxMembers = obj.max_members;
        this.vanityURL = obj.vanity_url_code || null;
        this.description = obj.description || null;
        this.bannerHash = obj.banner || null;
        this.boost = {
            tier: obj.premium_tier,
            count: obj.premium_subscription_count
        }
        this.preferredLocale = obj.preferred_locale;
        this.publicUpdatesChannel = obj.public_updates_channel_id; // TODO: Channel() (text channel)

        this.members = null;
        this.channels = null;
        this.presences = null;
    }
}

module.exports = Guild;