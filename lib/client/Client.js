const frequire = require('../util/FallbackRequire');

const EventEmitter = frequire('eventemitter3', 'events');

class Client extends EventEmitter {
    constructor(token, options = {}) {

    }
}