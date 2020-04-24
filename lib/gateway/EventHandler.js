const { wsEvents: events } = require('../util/Constants');

const Message = require('../models/Message');
const Guild = require('../models/Guild');
const User = require('../models/User');

/**
 * Used to handle events from the Discord gateway
 */
class EventHandler {
    /**
     * Create a new events handler
     * @param {*} client An existing client
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * Handle a gateway event
     * @param {string} t Gateway event name
     * @param {*} d Gateway data packet
     */
    async handle(t, d) {
        if (t === events.READY[0]) {
            const botUser = new User(this.client, d.user);

            this.client.status = 2;
            this.client.readyAt = Date.now();
            this.user = botUser;
            this.client.ws.sessionID = d.session_id;
            this.client.ws.version = d.v;

            for (const guild of d.guilds) {
                this.client.guilds.set(guild.id, guild);
            }

            this.client.emit('debug', `Client ready at ${new Date().toDateString()}`);

            return this.client.emit(events.READY[1]);
        }

        if (t === events.RESUME[0]) {
            this.client.emit('debug', 'Session resumed');
            
            return this.client.emit(events.RESUME[1]);
        }

        if (t === events.MESSAGE_CREATE[0]) {
            const guild = this.client.guilds.get(d.guild_id);
            const author = new User(this.client, d.author);
            const channel = await guild.channels.get(d.channel_id);

            const message = new Message(this.client, d, author, guild, channel);
            
            this.client.emit(events.MESSAGE_CREATE[1], message);
        }

        if (t === events.GUILD_CREATE[0]) {
            const guild = new Guild(this.client, d);

            if (this.client.guilds.has(d.id)) {
                this.client.guilds.delete(d.id);
                this.client.guilds.set(d.id, guild);

                return this.client.emit(events.GUILD_AVAILABLE[1], guild);
            } else {
                this.client.guilds.set(d.id, guild);
                
                return this.client.emit(events.GUILD_CREATE[1], guild);
            }
        }

        if (t === events.GUILD_DELETE[0]) {
            let guild = null;

            if (this.client.guilds.has(d.id)) {
                guild = this.client.guilds.get(d.id);

                this.client.guilds.delete(d.id);
            }

            return this.client.emit(events.GUILD_DELETE[1], guild);
        }

        if (t === events.GUILD_UPDATE[0]) {
            const currentGuild = this.client.guilds.get(d.id);
            const newGuild = new Guild(this.client, d);

            this.client.guilds.delete(d.id);
            this.client.guilds.set(d.id, newGuild);

            return this.client.emit(events.GUILD_UPDATE[1], (currentGuild, newGuild));
        }
    }
 }

module.exports = EventHandler;