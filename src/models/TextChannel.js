const Channel = require('./Channel');

module.exports = class TextChannel extends Channel {
    constructor(obj) {
        super(obj);
    }

    async createMessage() {

    }
}