const baseURL = 'https://discordapp.com/api/v6';

const cdnURL = 'https://cdn.discordapp.com';

const defaultClientOptions = {
    auto: true,
    cacheMessages: true,
    ignoredEvents: [],
    intents: ['GUILDS', 'GUILD_MESSAGES'],
    messageCacheCheckTime: 60,
    messageCacheMaxAge: 300,
    messageCacheMaxSize: 100
}

const wsEvents = {
        READY: ['READY', 'ready'],
        RESUME: ['RESUME', 'resumed'],
        MESSAGE_CREATE: ['MESSAGE_CREATE', 'message'],
        MESSAGE_UPDATE: ['MESSAGE_UPDATE', 'messageUpdate'],
        MESSAGE_DELETE: ['MESSAGE_DELETE', 'messageDelete'],
        /*   */ MESSAGE_DELETE_BULK: ['MESSAGE_DELETE_BULK', 'messageBulkDelete'],
        /*   */ MESSAGE_REACTION_ADD: ['MESSAGE_REACTION_ADD', 'messageReactionAdd'],
        /*   */ MESSAGE_REACTION_REMOVE: ['MESSAGE_REACTION_REMOVE', 'messageReactionRemove'],
        /*   */ MESSAGE_REACTION_REMOVE_ALL: ['MESSAGE_REACTION_REMOVE_ALL', 'messageReactionAllRemove'],
        /*   */ MESSAGE_REACTION_REMOVE_EMOJI: ['MESSAGE_REACTION_REMOVE_EMOJI', 'messageReactionEmojiRemove'],
        /*   */ CHANNEL_CREATE: ['CHANNEL_CREATE', 'channelCreate'],
        /*   */ CHANNEL_UPDATE: ['CHANNEL_UPDATE', 'channelUpdate'],
        /*   */ CHANNEL_DELETE: ['CHANNEL_DELETE', 'channelDelete'],
        /*   */ CHANNEL_PINS_UPDATE: ['CHANNEL_PINS_UPDATE', 'channelPinsUpdate'],
        GUILD_CREATE: ['GUILD_CREATE', 'guildCreate'],
        GUILD_UPDATE: ['GUILD_UPDATE', 'guildUpdate'],
        GUILD_DELETE: ['GUILD_DELETE', 'guildDelete'],
        GUILD_AVAILABLE: ['GUILD_AVAILABLE', 'guildAvailable'],
        /*   */ GUILD_BAN_ADD: ['GUILD_BAN_ADD', 'guildBanCreate'],
        /*   */ GUILD_BAN_REMOVE: ['GUILD_BAN_REMOVE', 'guildBanDelete'],
        /*   */ GUILD_EMOJIS_UPDATE: ['GUILD_EMOJIS_UPDATE', 'guildEmojisUpdate'],
        /*   */ GUILD_INTEGRATIONS_UPDATE: ['GUILD_INTEGRATIONS_UPDATE', 'guildIntegrationsUpdate'],
        /*   */ GUILD_ROLE_CREATE: ['GUILD_ROLE_CREATE', 'roleCreate'],
        /*   */ GUILD_ROLE_UPDATE: ['GUILD_ROLE_UPDATE', 'roleUpdate'],
        /*   */ GUILD_ROLE_DELETE: ['GUILD_ROLE_DELETE', 'roleDelete'],
        /*   */ GUILD_MEMBER_ADD: ['GUILD_MEMBER_ADD', 'guildMemberJoin'],
        /*   */ GUILD_MEMBER_UPDATE: ['GUILD_MEMBER_UPDATE', 'guildMemberUpdate'],
        /*   */ GUILD_MEMBER_REMOVE: ['GUILD_MEMBER_REMOVE', 'guildMemberLeave'],
        /*   */ GUILD_MEMBER_CHUNK: ['GUILD_MEMBER_CHUNK', 'guildMemberChunk'],
        /*   */ PRESENCE_UPDATE: ['PRESENCE_UPDATE', 'presenceUpdate'],
        /*   */ VOICE_STATE_UPDATE: ['VOICE_STATE_UPDATE', 'voiceStateUpdate'],
        /*   */ VOICE_SERVER_UPDATE: ['VOICE_SERVER_UPDATE', 'voiceServerUpdate'],
        /*   */ WEBHOOKS_UPDATE: ['WEBHOOKS_UPDATE', 'webhookUpdate'],
        /*   */ INVITE_CREATE: ['INVITE_CREATE', 'inviteCreate'],
        /*   */ INVITE_DELETE: ['INVITE_DELETE', 'inviteDelete'],
        /*   */ USER_UPDATE: ['USER_UPDATE', 'userUpdate'],
        /*   */ TYPING_START: ['TYPING_START', 'typing'],
}

const wsCloseCodes = {
    4000: { message: 'Unknown error', reconnect: true },
    4001: { message: 'Unknown opcode', reconnect: false },
    4002: { message: 'Decode error', reconnect: false },
    4003: { message: 'Not authenticated', reconnect: false },
    4004: { message: 'Authentication failed', reconnect: false },
    4005: { message: 'Already authenticated', reconnect: false },
    4007: { message: 'Invalid sequence', reconnect: true },
    4008: { message: 'Ratelimit reached', reconnect: false },
    4009: { message: 'Session timed out', reconnect: true },
    4010: { message: 'Invalid shard', reconnect: false },
    4011: { message: 'Sharding required', reconnect: false },
    4012: { message: 'Invalid API version', reconnect: false },
    4013: { message: 'Invalid intent(s)', reconnect: false },
    4014: { message: 'Disallowed intent(s)', reconnect: false }
}

const opcodes = {
    DISPATCH: 0,
    HEARTBEAT: 1,
    IDENTIFY: 2,
    STATUS_UPDATE: 3,
    VOICE_STATE_UPDATE: 4,
    VOICE_SERVER_PING: 5,
    RESUME: 6,
    RECONNECT: 7,
    REQUEST_GUILD_MEMBERS: 8,
    INVALID_SESSION: 9,
    HELLO: 10,
    HEARTBEAT_ACK: 11
}

const channelTypes = {
    TEXT: 0,
    DM: 1,
    VOICE: 2,
    GROUP_DM: 3,
    CATEGORY: 4,
    NEWS: 5,
    STORE: 6
}

const permissions = {
    CREATE_INSTANT_INVITE: { hex: 0x00000001, twofactor: false, overrides: [], channelTypes: [
        channelTypes.TEXT, channelTypes.VOICE
    ] },
    KICK_MEMBERS: { hex: 0x00000002, twofactor: true, overrides: [], channelTypes: [] },
    BAN_MEMBERS: { hex: 0x00000004, twofactor: true, overrides: [], channelTypes: [] },
    ADMINISTRATOR: { hex: 0x00000008, twofactor: true, overrides: true, channelTypes: [] },
    MANAGE_CHANNELS: { hex: 0x00000010, twofactor: true, overrides: [], channelTypes: [
        channelTypes.TEXT, channelTypes.VOICE
    ] },
    MANAGE_GUILD: { hex: 0x00000020, twofactor: true, overrides: [], channelTypes: [] },
    ADD_REACTIONS: { hex: 0x00000040, twofactor: false, overrides: [], channelTypes: [
        channelTypes.TEXT
    ] },
    VIEW_AUDIT_LOG: { hex: 0x00000080, twofactor: false, overrides: [], channelTypes: [] },
    PRIORITY_SPEAKER: { hex: 0x00000100, twofactor: false, overrides: [], channelTypes: [
        channelTypes.VOICE
    ] },
    STREAM: { hex: 0x00000200, twofactor: false, overrides: [], channelTypes: [
        channelTypes.VOICE
    ] },
    VIEW_CHANNEL: { hex: 0x00000400, twofactor: false, overrides: [], channelTypes: [
        channelTypes.TEXT, channelTypes.VOICE
    ] },
    SEND_MESSAGES: { hex: 0x00000800, twofactor: false, overrides: [], channelTypes: [
        channelTypes.TEXT
    ] },
    SEND_TTS_MESSAGES: { hex: 0x00001000, twofactor: false, overrides: [], channelTypes: [
        channelTypes.TEXT
    ] },
    MANAGE_MESSAGES: { hex: 0x00002000, twofactor: true, overrides: [], channelTypes: [
        channelTypes.TEXT
    ] },
    EMBED_LINKS: { hex: 0x00004000, twofactor: false, overrides: [], channelTypes: [
        channelTypes.TEXT
    ] },
    ATTACH_FILES: { hex: 0x00008000, twofactor: false, overrides: [], channelTypes: [
        channelTypes.TEXT
    ] },
    READ_MESSAGE_HISTORY: { hex: 0x00010000, twofactor: false, overrides: [], channelTypes: [
        channelTypes.TEXT
    ] },
    MENTION_EVERYONE: { hex: 0x00020000, twofactor: false, overrides: [], channelTypes: [
        channelTypes.TEXT
    ] },
    USE_EXTERNAL_EMOJIS: { hex: 0x00040000, twofactor: false, overrides: [], channelTypes: [
        channelTypes.TEXT
    ] },
    VIEW_GUILD_INSIGHTS	: { hex: 0x00080000, twofactor: false, overrides: [], channelTypes: [] },
    CONNECT: { hex: 0x00100000, twofactor: false, overrides: [], channelTypes: [
        channelTypes.VOICE
    ] },
    SPEAK: { hex: 0x00200000, twofactor: false, overrides: [], channelTypes: [
        channelTypes.VOICE
    ] },
    MUTE_MEMBERS: { hex: 0x00400000, twofactor: false, overrides: [], channelTypes: [
        channelTypes.VOICE
    ] },
    DEAFEN_MEMBERS: { hex: 0x00800000, twofactor: false, overrides: [], channelTypes: [
        channelTypes.VOICE
    ] },
    MOVE_MEMBERS: { hex: 0x01000000, twofactor: false, overrides: [], channelTypes: [
        channelTypes.VOICE
    ] },
    USE_VAD: { hex: 0x02000000, twofactor: false, overrides: [], channelTypes: [
        channelTypes.VOICE
    ] },
    CHANGE_NICKNAME: { hex: 0x04000000, twofactor: false, overrides: [], channelTypes: [] },
    MANAGE_NICKNAMES: { hex: 0x08000000, twofactor: false, overrides: [], channelTypes: [] },
    MANAGE_ROLES: { hex: 0x10000000, twofactor: true, overrides: [], channelTypes: [
        channelTypes.TEXT, channelTypes.VOICE
    ] },
    MANAGE_WEBHOOKS: { hex: 0x20000000, twofactor: true, overrides: [], channelTypes: [
        channelTypes.TEXT, channelTypes.VOICE
    ] },
    MANAGE_EMOJIS: { hex: 0x40000000, twofactor: true, overrides: [], channelTypes: [] }
}

const intents = {
    GUILDS: { bitwise: 1 << 0, privlidged: false, wsEvents: [
        wsEvents.GUILD_CREATE, wsEvents.GUILD_UPDATE, wsEvents.GUILD_DELETE, wsEvents.GUILD_ROLE_CREATE, wsEvents.GUILD_ROLE_UPDATE,
        wsEvents.GUILD_ROLE_DELETE, wsEvents.CHANNEL_CREATE, wsEvents.CHANNEL_UPDATE, wsEvents.CHANNEL_DELETE, wsEvents.CHANNEL_PINS_UPDATE
    ] },
    GUILD_MEMBERS: { bitwise: 1 << 1, privlidged: true, wsEvents: [
        wsEvents.GUILD_MEMBER_ADD, wsEvents.GUILD_MEMBER_UPDATE, wsEvents.GUILD_MEMBER_REMOVE
    ] },
    GUILD_BANS: { bitwise: 1 << 2, privlidged: false, wsEvents: [
        wsEvents.GUILD_BAN_ADD, wsEvents.GUILD_BAN_REMOVE
    ] },
    GUILD_EMOJIS: { bitwise: 1 << 3, privlidged: false, wsEvents: [
        wsEvents.GUILD_EMOJIS_UPDATE
    ] },
    GUILD_INTEGRATIONS: { bitwise: 1 << 4, privlidged: false, wsEvents: [
        wsEvents.GUILD_INTEGRATIONS_UPDATE
    ] },
    GUILD_WEBHOOKS: { bitwise: 1 << 5, privlidged: false, wsEvents: [
        wsEvents.WEBHOOKS_UPDATE
    ] },
    GUILD_INVITES: { bitwise: 1 << 6, privlidged: false, wsEvents: [
        wsEvents.INVITE_CREATE, wsEvents.INVITE_DELETE
    ] },
    GUILD_VOICE_STATES: { bitwise: 1 << 7, privlidged: false, wsEvents: [
        wsEvents.VOICE_STATE_UPDATE
    ] },
    GUILD_PRESENCES: { bitwise: 1 << 8, privlidged: true, wsEvents: [
        wsEvents.PRESENCE_UPDATE
    ] },
    GUILD_MESSAGES: { bitwise: 1 << 9, privlidged: false, wsEvents: [
        wsEvents.MESSAGE_CREATE, wsEvents.MESSAGE_UPDATE, wsEvents.MESSAGE_DELETE, wsEvents.MESSAGE_DELETE_BULK
    ] },
    GUILD_MESSAGE_REACTIONS: { bitwise: 1 << 10, privlidged: false, wsEvents: [
        wsEvents.MESSAGE_REACTION_ADD, wsEvents.MESSAGE_REACTION_REMOVE, wsEvents.MESSAGE_REACTION_REMOVE_ALL, wsEvents.MESSAGE_REACTION_REMOVE_EMOJI
    ] },
    GUILD_MESSAGE_TYPING: { bitwise: 1 << 11, privlidged: false, wsEvents: [
        wsEvents.TYPING_START
    ] },
    DIRECT_MESSAGES: { bitwise: 1 << 12, privlidged: false, wsEvents: [
        wsEvents.CHANNEL_CREATE, wsEvents.MESSAGE_CREATE, wsEvents.MESSAGE_UPDATE, wsEvents.MESSAGE_DELETE, wsEvents.CHANNEL_PINS_UPDATE
    ] },
    DIRECT_MESSAGE_REACTIONS: { bitwise: 1 << 13, privlidged: false, wsEvents: [
        wsEvents.MESSAGE_REACTION_ADD, wsEvents.MESSAGE_REACTION_REMOVE, wsEvents.MESSAGE_REACTION_REMOVE_ALL, wsEvents.MESSAGE_REACTION_REMOVE_EMOJI
    ] },
    DIRECT_MESSAGE_TYPING: { bitwise: 1 << 14, privlidged: false, wsEvents: [
        wsEvents.TYPING_START
    ] }
}

const embedColors = {
    'BLUE': '#0000ff',
    'RED': '#ff0000',
    'YELLOW': '#ffff00',
    'GREEN': '#00ff00'
}

const auditLogEntryTypes = {
    GUILD_UPDATE: 1,
    CHANNEL_CREATE: 10,
    CHANNEL_UPDATE: 11,
    CHANNEL_DELETE: 12,
    CHANNEL_OVERWRITE_CREATE: 13,
    CHANNEL_OVERWRITE_UPDATE: 14,
    CHANNEL_OVERWRITE_DELETE: 15,
    MEMBER_KICK: 20,
    MEMBER_PRUNE: 21,
    MEMBER_BAN_ADD: 22,
    MEMBER_BAN_REMOVE: 23,
    MEMBER_UPDATE: 24,
    MEMBER_ROLE_UPDATE: 25,
    MEMBER_MOVE: 26,
    MEMBER_DISCONNECT: 27,
    BOT_ADD: 28,
    ROLE_CREATE: 30,
    ROLE_UPDATE: 31,
    ROLE_DELETE: 32,
    INVITE_CREATE: 40,
    INVITE_UPDATE: 41,
    INVITE_DELETE: 42,
    WEBHOOK_CREATE: 50,
    WEBHOOK_UPDATE: 51,
    WEBHOOK_DELETE: 52,
    EMOJI_CREATE: 60,
    EMOJI_UPDATE: 61,
    EMOJI_DELETE: 62,
    MESSAGE_DELETE: 72,
    MESSAGE_BULK_DELETE: 73,
    MESSAGE_PIN: 74,
    MESSAGE_UNPIN: 75,
    INTEGRATION_CREATE: 80,
    INTEGRATION_UPDATE: 81,
    INTEGRATION_DELETE: 82
}

const auditLogEntryChangeTypes = {
    /* guild */
    name: { itemChanged: 'guild', valueType: 'string', description: 'name changed' },
    icon_hash: { itemChanged: 'guild', valueType: 'string', description: 'icon changed' },
    splash_hash: { itemChanged: 'guild', valueType: 'string', description: 'invite splash page artwork changed' },
    owner_id: { itemChanged: 'guild', valueType: 'snowflake', description: 'owner changed' },
    region: { itemChanged: 'guild', valueType: 'string', description: 'region changed' },
    afk_channel_id: { itemChanged: 'guild', valueType: 'snowflake', description: 'afk channel changed' },
    afk_timeout: { itemChanged: 'guild', valueType: 'number', description: 'afk timeout duration changed' },
    mfa_level: { itemChanged: 'guild', valueType: 'number', description: 'two-factor auth requirement changed' },
    verification_level: { itemChanged: 'guild', valueType: 'number', description: 'required verification level changed' },
    explicit_content_filter: { itemChanged: 'guild', valueType: 'number', description: 'change in whose messages are scanned and deleted for explicit content in the server' },
    default_message_notifications: { itemChanged: 'guild', valueType: 'number', description: 'default message notification level changed' },
    vanity_url_code: { itemChanged: 'guild', valueType: 'string', description: 'guild invite vanity url changed' },
    $add: { itemChanged: 'guild', valueType: 'array', description: 'new role added' },
    $remove: { itemChanged: 'guild', valueType: 'array', description: 'role removed' },
    prune_delete_days: { itemChanged: 'guild', valueType: 'number', description: 'change in number of days after which inactive and role-unassigned members are kicked' },
    widget_enabled: { itemChanged: 'guild', valueType: 'boolean', description: 'server widget enabled/disable' },
    widget_channel_id: { itemChanged: 'guild', valueType: 'snowflake', description: 'channel id of the server widget changed' },
    system_channel_id: { itemChanged: 'guild', valueType: 'snowflake', description: 'id of the system channel changed' },

    /* channel */
    position: { itemChanged: 'channel', valueType: 'number', description: 'text or voice channel position changed' },
    topic: { itemChanged: 'channel', valueType: 'string', description: 'text channel topic changed' },
    bitrate: { itemChanged: 'channel', valueType: 'number', description: 'voice channel bitrate changed' },
    permission_overwrites: { itemChanged: 'channel', valueType: 'array', description: 'permissions on a channel changed' },
    nsfw: { itemChanged: 'channel', valueType: 'boolean', description: 'channel nsfw restriction changed' },
    application_id: { itemChanged: 'channel', valueType: 'snowflake', description: 'application id of the added or removed webhook or bot' },
    rate_limit_per_user: { itemChanged: 'channel', valueType: 'number', description: 'amount of seconds a user has to wait before sending another message changed' },

    /* role */
    permissions: { itemChanged: 'role', valueType: 'number', description: '	permissions for a role changed' },
    color: { itemChanged: 'role', valueType: 'number', description: 'role color changed' },
    hoist: { itemChanged: 'role', valueType: 'boolean', description: 'role is now displayed/no longer displayed separate from online users' },
    mentionable: { itemChanged: 'role', valueType: 'booleam', description: 'role is now mentionable/unmentionable' },
    allow: { itemChanged: 'role', valueType: 'number', description: 'a permission on a text or voice channel was allowed for a role' },
    deny: { itemChanged: 'role', valueType: 'number', description: 'a permission on a text or voice channel was denied for a role' },

    /* invite */
    code: { itemChanged: 'invite', valueType: 'string', description: 'invite code changed' },
    channel_id: { itemChanged: 'invite', valueType: 'snowflake', description: 'channel for invite code changed' },
    inviter_id: { itemChanged: 'invite', valueType: 'snowflake', description: 'person who created invite code changed' },
    max_uses: { itemChanged: 'invite', valueType: 'number', description: 'change to max number of times invite code can be used' },
    uses: { itemChanged: 'invite', valueType: 'number', description: 'number of times invite code used changed' },
    max_age: { itemChanged: 'invite', valueType: 'number', description: 'how long invite code lasts changed' },
    temporary: { itemChanged: 'invite', valueType: 'boolean', description: 'invite code is temporary/never expires' },

    /* user */
    deaf: { itemChanged: 'user', valueType: 'boolean', description: 'user server deafened/undeafened' },
    mute: { itemChanged: 'user', valueType: 'boolean', description: 'user server muted/unmuted' },
    nick: { itemChanged: 'user', valueType: 'string', description: 'user nickname changed' },
    avatar_hash: { itemChanged: 'user', valueType: 'string', description: 'user avatar changed' },

    /* any */
    id: { itemChanged: 'any', valueType: 'any', description: 'the id of the changed entity - sometimes used in conjunction with other keys' },
    type: { itemChanged: 'any', valueType: 'string|number', description: 'type of entity created' },

    /* integration */
    enable_emoticons: { itemChanged: 'integration', valueType: 'boolean', description: 'integration emoticons enabled/disabled' },
    expire_behavior: { itemChanged: 'integration', valueType: 'number', description: 'integration expiring subscriber behavior changed' },
    expire_grace_period: { itemChanged: 'integration', valueType: 'number', description: 'integration expire grace period changed' }
}

module.exports = {
    baseURL,
    cdnURL,
    defaultClientOptions,
    wsEvents,
    wsCloseCodes,
    opcodes,
    channelTypes,
    permissions,
    intents,
    embedColors,
    auditLogEntryTypes,
    auditLogEntryChangeTypes
}