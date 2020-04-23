/**
 * An improved Map to hold items
 */
class Collection extends Map {
    /**
     * Create a new Collection
     * @param {Collection|Map} [iterable=undefined] An existing Collection or Map
     */
    constructor(iterable = undefined) {
        super(iterable);
    }

    /**
     * Return a random item from the Collection
     */
    random() {
        const array = this.toKeyArray();
        return this.get(array[Math.floor(Math.random() * array.length)]);
    }

    /**
     * Make a clone of the Collection
     */
    clone() {
        return new this.constructor(this);
    }

    /**
     * Returns the first value of the collection.
     * @returns {any}
     */
    first() {
        return this.values().next().value;
    }

    /**
     * Maps the items from the Collection using the provided mapping function
     * @param {function} func A function to use with the items to map them
     */
    map(func) {
        if (!(mapper instanceof Function)) throw new Error("Cannot map values without a function.");
        return this.toValueArray().map(mapper.bind(this));
    }

    /**
     * Finds all items from the Collection that match the filter function
     * @param {function} func A function that returns a truthy value
     */
    filter(func) {
        if (!(filter instanceof Function)) throw new Error("Cannot map values without a function.");
        return this.toValueArray().filter(func.bind(this));
    }

    /**
     * Find the first item from the Collection that matches the filter function
     * @param {function} func A function that returns a truthy value
     */
    find(func) {
        return this.toValueArray().filter(func.bind(this)).first();
    }

    /**
     * Convert the Collection to an array of keys
     */
    toKeyArray() {
        return [...this.keys()];
    }

    /**
     * Convert the Collection to an array of values
     * @returns {Array<any>}
     */
    toValueArray() {
        return [...this.values()];
    }
}

module.exports = Collection;