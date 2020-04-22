const frequire = require('../util/FallbackRequire');

const EventEmitter = frequire('eventemitter3', 'events');

const Collection = require('../util/Collection');
const Gateway = require('../gateway/Gateway');
const RESTHandler = require('../util/Requests/RESTHandler');

const defaultOptions = {
    auto: true,
    cacheMessages: false,
    ignoredEvents: []
}

/**
 * The base of any Discord bot made with the library
 */
class Client extends EventEmitter {
    /**
     * Create a new Client
     * @param {string} token Your bot's Discord token
     * @param {object} [options] An optional object containing extra settings for the Client
     * @param {boolean} [options.auto=true] Whether to automatically connect to Discord or not
     * @param {boolean} [options.cacheMessages=false] Whether to cache messages, disabled by default to reduce memory overhead
     * @param {Array} [options.ignoredEvents=[]] An array of events not to process
     * @param {number} [options.messageCacheCheckTime=300] How long to wait in seconds between clearing the cache. Longer times mean the cache will be emptied less often, but messages will stay in the cache for longer.
     * @param {number} [options.messageCacheMaxAge=300] How long a message can stay in the cache in seconds before being removed
     * @param {number} [options.messageCacheMaxSize=100] The maximum ammount of messages that can be cached. If the cache fills up, any messages after will be ignored.
     */
    constructor(token, options = defaultOptions) {
        super();
        
        this.token = token;
        this.options = options;
        this.status = 0;
        this.ws = null;
        this.readyAt = null;

        this.guilds = new Collection();
        if (options.cacheMessages) this.messages = new Collection();
        else this.messages = null;

        this.gateway = new Gateway(this);
        this.rest = new RESTHandler(this);

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

        this.gateway.connect();

        return this;
    }
}

module.exports = Client;