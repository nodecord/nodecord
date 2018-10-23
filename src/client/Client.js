const EventEmitter = require('events');
const Store = require('../util/Store');

module.exports = class Client extends EventEmitter {
    constructor(token) {
        super();

        this.guilds = new Store();
        this.users = new Store();
        this.channels = new Store();
        
        this.ws = {
            socket: null,
            gateway: {
                url: null,
                obtainedAt: null,
                heartbeat: {
                    interval: null,
                    last: null,
                    recieved: false,
                    seq: null,
                }
            }
        };
        this.token = token;
        this.readyAt = 0;
        this.user = null;
        this.sessionId = null;
    }

    static get MessageEmbed() {
        return require('../util/Message/MessageEmbed');
    }

    login() {
        let attemptLogin = require('../gateway/websocket');
        attemptLogin(this);
    }
}