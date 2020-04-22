const { cdnURL } = require('../util/Constants');

/**
 * Represents a Discord user
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
        this.avatarHash = obj.avatar || null;
        this.discriminator = obj.discriminator;
        this.bot = obj.bot || false;
    }

    get tag() {
        return `${this.username}#${this.discriminator}`;
    }

    /**
     * Get the user's avatar URL, or null 
     * @param {string} [type='png|gif'] The type of the avatar, must be png, jpg, webp or gif
     * @param {number} [size=128] The size of the avatar, must be a power of two between 16 and 2048
     * @param {boolean} [includeDefault=false] If the user has no avatar, provide the default avatar instead of null
     */
    avatar(type, size = 128, includeDefault) {
        if (!type) type = 'png';
        if (!type && this.avatarHash.startsWith('a_')) type = 'gif';

        if (!this.avatarHash && includeDefault) return `${cdnURL}/embed/avatars/${this.discriminator % 5}.${type}?size=${size}`;
        if (!this.avatarHash && !includeDefault) return null;

        return `${cdnURL}/avatars/${this.id}/${this.avatarHash}.${type}?size=${size}`;
    }
}

module.exports = User;