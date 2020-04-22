const Channel = require('./Channel');

/**
 * Represents a Discord category
 */
class Category extends Channel {
    /**
     * Create a new category
     * @param {*} client An existing client
     * @param {object} obj The channel object to create this category from
     */
    constructor(client, obj, guild = undefined) {
        super(client, obj);

        this.guild = guild || null;
    }
}

module.exports = Category;