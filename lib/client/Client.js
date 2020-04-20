const frequire = require('../util/FallbackRequire');

const EventEmitter = frequire('eventemitter3', 'events');

const Collection = require('../util/Collection');

class Client extends EventEmitter {
    /**
     * The base of any Discord bot made with the library
     * @param {string} token Your bot's Discord token
     * @param {object} [options] An optional object containing extra settings for the Client
     * @param {boolean} auto Whether to
     */
    constructor(token, options = {}) {
        this.token = `Bot ${token}`;
    }
}

module.exports = Client;