/**
 * Represents a standard Discord user
 */
class User {
    /**
     * Create a new user
     * @param {*} client An existing client
     * @param {object} obj The user object to create this user from
     */
    constructor(client, obj) {
        this.id = obj.id;

        this.username = obj.username;
        this.discriminator = obj.discriminator;
        this.bot = obj.bot; 
        this.avatar = obj.avatar;
    }

    get tag() {
        return `${this.username}#${this.discriminator}`;
    }
}

module.exports = User;