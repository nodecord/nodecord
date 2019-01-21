module.exports = class Store extends Map {
    constructor(iterable) { // eslint-disable-line
        super(iterable);
    }

    /**
     * Returns an array of keys.
     * @returns {Array}
     */
    toKeyArray() {
        return [...this.keys()];
    }

    /**
     * Returns an array of values.
     * @returns {Array<any>}
     */
    toValueArray() {
        return [...this.values()];
    }

    /**
     * Returns a random key.
     * @returns {Array<any>}
     */
    randomKey() {
        const keyArr = this.toKeyArray();
        return keyArr[Math.floor(Math.random() * keyArr.length)];
    }

    /**
     * Returns a random value.
     * @returns {Array<any>},
     */
    randomValue() {
        const valueArr = this.toValueArray();
        return valueArr[Math.floor(Math.random() * valueArr.length)];
    }

    /**
     * Finds a value using a key.
     * @param {string} key The property you want to search in.
     * @param {string} toFind The value you want to find.
     * @returns {any} The value that was found.
     * @example
     * client.guilds.find("id", "461416643684204554")
     * // finds a guild by the id of 461416643684204554
     */
    find(key, toFind) {
        for (const v of this.values()) {
            if (v[key] === toFind) return v;
        }
    }

    /**
     * Returns the first value of the collection.
     * @returns {any}
     */
    first() {
        return this.values().next().value;
    }

    /**
     * Maps an array using the provided function.
     * @param {function} mapper The map function.
     * @returns {Array<any>}
     */
    map(mapper) {
        if (!(mapper instanceof Function)) throw new Error("Cannot map values without a function.");
        return this.toValueArray().map(mapper.bind(this));
    }

    /**
     * Filters an array using the provided function.
     * @param {function} filter The filter function.
     * @returns {Array<any>}
     */
    filter(filter) {
        if (!(filter instanceof Function)) throw new Error("Cannot map values without a function.");
        return this.toValueArray().filter(filter.bind(this));
    }

    /**
     * Clones the map.
     * @returns {KlassicMap}
     */
    makeClone() {
        return new this.constructor(this);
    }
}