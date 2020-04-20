const frequire = require('../util/FallbackRequire');

const EventEmitter = frequire('eventemitter3', 'events');

const Collection = require('../util/Collection');
const Gateway = require('../gateway/Gateway');

class Client extends EventEmitter {
    /**
     * The base of any Discord bot made with the library
     * @param {string} token Your bot's Discord token
     * @param {object} [options] An optional object containing extra settings for the Client
     * @param {boolean} [auto=true] Whether to automatically connect to Discord or not
     * @param {Array} [ignoredEvents=[]] An array of events not to process
     */
    constructor(token, options = {}) {
        super();
        
        this.token = token;
        this.options = options;
        this.status = 0;
        this.ws = null;
        this.readyAt = null;

        this.guilds = new Collection();

        if (this.options.auto && this.options.auto === false) return this;
        else return this.connect();
    }

    get version() {
        return require('../../package.json').version;
    }

    get uptime() {
        if (!this.readyAt) return null;
        return Date.now() - this.readyAt;
    }

    /**
     * Connect to Discord if set not to automatically connect
     */
    connect() {
        if (this.status !== 0) throw new Error(`Client is already connecting or connected`);

        this.status = 1;

        Gateway(this);

        return this;
    }
}

module.exports = Client;