const Constants = require('../util/Constants');

class EventHandler {
    /**
     * Used to handle events from the Discord gateway
     * @param {*} client An existing Client
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
        if (t === 'READY') {
            this.client.status = 2;
            this.client.readyAt = Date.now();
            this.client.ws.sessionID = d.session_id;
            this.client.ws.version = d.v;

            for (const guild of d.guilds) {
                this.client.guilds.set(guild.id, guild);
            }

            // TODO:
            // create bot.user here

            this.client.emit('ready');
        }
    }
}

module.exports = EventHandler;