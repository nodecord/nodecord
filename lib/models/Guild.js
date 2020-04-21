/**
 * Represents a Discord guild, known as a "server"
 */
class Guild {
    /**
     * Create a new guild
     * @param {*} client An existing client
     * @param {object} obj The guild object to create this guild from
     */
    constructor(client, obj) {
        this.id = obj.id;

        
    }
}

module.exports = Guild;