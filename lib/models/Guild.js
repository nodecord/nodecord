const Collection = require('../util/Collection');
const ChannelStore = require('../util/Stores/ChannelStore');
const { channelTypes } = require('../util/Constants');
const User = require('../models/User');
const Member = require('../models/Member');
const TextChannel = require('../models/TextChannel');
const VoiceChannel = require('../models/VoiceChannel');
const Category = require('../models/Category');
const NewsChannel = require('../models/NewsChannel');
const StoreChannel = require('../models/StoreChannel');
const AuditLog = require('./AuditLog');

/**
 * Represents a Discord guild, known as a "server"
 */
class Guild {
    /**
     * Create a new guild
     * @param {*} client An existing client
     * @param {object} obj The guild object to create this guild from
     */
    constructor(client, obj, user = undefined) {
        this.id = obj.id;
        this.client = client;
        this._permissions = obj.permissions;

        this.name = obj.name;
        this.iconHash = obj.icon || null;
        this.splashHash = obj.splash || null;
        this.discoverySplashHash = obj.discovery_splash || null;
        this.owner = user;
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

        this.members = new Collection();
        this.channels = new ChannelStore();
        this.presences = null;

        for (const member of obj.members) {
            let user = new User(client, member.user);
            this.members.set(member.user.id, new Member(client, member, user, this));
        }

        for (const channel of obj.channels) {
            if (channel.type === channelTypes.TEXT) this.channels.set(channel.id, new TextChannel(client, channel, this));
            if (channel.type === channelTypes.VOICE) this.channels.set(channel.id, new VoiceChannel(client, channel, this));
            if (channel.type === channelTypes.CATEGORY) this.channels.set(channel.id, new Category(client, channel, this));
            if (channel.type === channelTypes.NEWS) this.channels.set(channel.id, new NewsChannel(client, channel, this));
            if (channel.type === channelTypes.STORE) this.channels.set(channel.id, new StoreChannel(client, channel, this));
        }
    }

    /**
     * Fetch the guild's audit logs
     */
    async auditLogs() {
        const auditLogs = await this.client.rest.get(`/guilds/${this.id}/audit-logs`);

        return new AuditLog(this.client, auditLogs);
    }
}

module.exports = Guild;