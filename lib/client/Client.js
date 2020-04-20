const frequire = require('../util/FallbackRequire');

const EventEmitter = frequire('eventemitter3', 'events');

const Collection = require('../util/Collection');

class Client extends EventEmitter {
    /**
     * The base of any Discord bot made with the library
     * @param {string} token Your bot's Discord token
     * @param {object} [options] An optional object containing extra settings for the Client
     * @param {boolean} [auto=true] Whether to automatically connect to Discord or not
     */
    constructor(token, options = {}) {
        this.token = token;
        this.options = options;
        this.status = 0;

        connect();
    }

    connect() {
        if (this.status !== 0) throw new Error(`Client is connecting or already connected`);

        this.status = 1;

        
    }
}

module.exports = Client;