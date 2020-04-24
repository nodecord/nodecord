const Collection = require('../Collection');

/**
 * A special Collection for storing and working with messages
 */
class MessageStore extends Collection {
    /**
     * Create a new MessageStore
     * @param {Collection|Map} iterable An existing Collection or Map
     * @param {number} maxAge How long a message can stay in the cache in seconds before being removed
     * @param {number} maxItems The maximum ammount of messages that can be cached. If the cache fills up, any messages after will be ignored.
     */
    constructor(client, iterable, maxAge, maxItems) {
        super(iterable);

        this.client = client;
        
        this.maxAge = maxAge;
        this.maxItems = maxItems;
    }

    /**
     * Works like set(key, value) but attaches an age property needed for the cache 
     * @param {string} key The item key
     * @param {string} value The item value
     */
    add(key, value) {
        return this.set(key, { _age: Date.now(), _key: key, ...value });
    }

    /**
     * Start a timer that clears messages in the Collection that are older than the maxAge
     * @param {number} interval How long to wait in seconds between clearing the cache. Longer times mean the cache will be emptied less often, but messages will stay in the cache for longer.
     */
    timer(interval) {
        setInterval(() => {
            // TODO: upgrade this to Collection.sweep when built
            for (const item of this.toValueArray()) {
                if (!item._age || !item._key) throw new Error(`Timer found an invalid item in MessageStore`);

                const age = Date.now() - item._age;

                if (age > this.maxAge) {
                    this.delete(this._key);
                }
            }
        }, interval * 1000);
    }
}

module.exports = MessageStore;