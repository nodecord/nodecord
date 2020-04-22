/**
 * Represents a unicode or custom emoji reaction on a message
 */
class Reaction {
    /**
     * Create a new reaction
     * @param {*} client An existing client
     * @param {object} obj The reaction object to create this reaction from
     */
    constructor(client, obj) {
        this.count = obj.count;
        this.me = obj.me;
        this.emoji = {
            id: obj.emoji.id,
            name: obj.emoji.name || null,
            animated: obj.emoji.animated,
            managed: obj.emoji.managed,
            available: obj.emoji.available
        }
    }
}

module.exports = Reaction;