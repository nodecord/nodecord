const baseURL = 'https://discordapp.com/api/v6';

const cdnURL = 'https://cdn.discordapp.com';

const events = {
        READY: ['READY', 'ready'],
        RESUME: ['RESUME', 'resumed'],
        DEBUG: ['DEBUG', 'debug'],
        MESSAGE_CREATE: ['MESSAGE_CREATE', 'message'],
        /*   */ MESSAGE_UPDATE: ['MESSAGE_UPDATE', 'messageUpdate'],
        /*   */ MESSAGE_DELETE: ['MESSAGE_DELETE', 'messageDelete'],
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
        GUILD_DELETE: ['GUILD_DELETE', 'guildDelete'],
        GUILD_UPDATE: ['GUILD_UPDATE', 'guildUpdate'],
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
    GUILDS: { bitwise: 1 << 0, privlidged: false, events: [
        events.GUILD_CREATE, events.GUILD_UPDATE, events.GUILD_DELETE, events.GUILD_ROLE_CREATE, events.GUILD_ROLE_UPDATE,
        events.GUILD_ROLE_DELETE, events.CHANNEL_CREATE, events.CHANNEL_UPDATE, events.CHANNEL_DELETE, events.CHANNEL_PINS_UPDATE
    ] },
    GUILD_MEMBERS: { bitwise: 1 << 1, privlidged: true, events: [
        events.GUILD_MEMBER_ADD, events.GUILD_MEMBER_UPDATE, events.GUILD_MEMBER_REMOVE
    ] },
    GUILD_BANS: { bitwise: 1 << 2, privlidged: false, events: [
        events.GUILD_BAN_ADD, events.GUILD_BAN_REMOVE
    ] },
    GUILD_EMOJIS: { bitwise: 1 << 3, privlidged: false, events: [
        events.GUILD_EMOJIS_UPDATE
    ] },
    GUILD_INTEGRATIONS: { bitwise: 1 << 4, privlidged: false, events: [
        events.GUILD_INTEGRATIONS_UPDATE
    ] },
    GUILD_WEBHOOKS: { bitwise: 1 << 5, privlidged: false, events: [
        events.WEBHOOKS_UPDATE
    ] },
    GUILD_INVITES: { bitwise: 1 << 6, privlidged: false, events: [
        events.INVITE_CREATE, events.INVITE_DELETE
    ] },
    GUILD_VOICE_STATES: { bitwise: 1 << 7, privlidged: false, events: [
        events.VOICE_STATE_UPDATE
    ] },
    GUILD_PRESENCES: { bitwise: 1 << 8, privlidged: true, events: [
        events.PRESENCE_UPDATE
    ] },
    GUILD_MESSAGES: { bitwise: 1 << 9, privlidged: false, events: [
        events.MESSAGE_CREATE, events.MESSAGE_UPDATE, events.MESSAGE_DELETE, events.MESSAGE_DELETE_BULK
    ] },
    GUILD_MESSAGE_REACTIONS: { bitwise: 1 << 10, privlidged: false, events: [
        events.MESSAGE_REACTION_ADD, events.MESSAGE_REACTION_REMOVE, events.MESSAGE_REACTION_REMOVE_ALL, events.MESSAGE_REACTION_REMOVE_EMOJI
    ] },
    GUILD_MESSAGE_TYPING: { bitwise: 1 << 11, privlidged: false, events: [
        events.TYPING_START
    ] },
    DIRECT_MESSAGES: { bitwise: 1 << 12, privlidged: false, events: [
        events.CHANNEL_CREATE, events.MESSAGE_CREATE, events.MESSAGE_UPDATE, events.MESSAGE_DELETE, events.CHANNEL_PINS_UPDATE
    ] },
    DIRECT_MESSAGE_REACTIONS: { bitwise: 1 << 13, privlidged: false, events: [
        events.MESSAGE_REACTION_ADD, events.MESSAGE_REACTION_REMOVE, events.MESSAGE_REACTION_REMOVE_ALL, events.MESSAGE_REACTION_REMOVE_EMOJI
    ] },
    DIRECT_MESSAGE_TYPING: { bitwise: 1 << 14, privlidged: false, events: [
        events.TYPING_START
    ] }
}

const embedColors = {
    'BLUE': '#0000ff',
    'RED': '#ff0000',
    'YELLOW': '#ffff00',
    'GREEN': '#00ff00'
}

module.exports = {
    baseURL,
    cdnURL,
    events,
    opcodes,
    channelTypes,
    permissions,
    intents,
    embedColors
}