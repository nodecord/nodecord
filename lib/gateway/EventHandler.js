const { events } = require('../util/Constants');

const Message = require('../models/Message');

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
    handle(t, d) {
        if (t === events.READY[0]) {
            this.client.status = 2;
            this.client.readyAt = Date.now();
            this.client.ws.sessionID = d.session_id;
            this.client.ws.version = d.v;

            for (const guild of d.guilds) {
                this.client.guilds.set(guild.id, guild);
            }

            // TODO:
            // create bot.user here

            this.client.emit('debug', `Client ready at ${new Date().toDateString()}`);

            return this.client.emit(events.READY[1]);
        }

        if (t === events.RESUME[0]) {
            this.client.emit('debug', 'Session resumed');
            
            return this.client.emit(events.RESUME[1]);
        }

        if (t === events.MESSAGE_CREATE[0]) {
            const message = new Message(this.client, d);
            
            this.client.emit(events.MESSAGE_CREATE[1], message);
        }
    }
 }

module.exports = EventHandler;