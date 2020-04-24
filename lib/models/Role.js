/**
 * Represents a Discord role
 */
class Role {
    /**
     * Create a new role
     * @param {*} client An existing client
     * @param {object} obj The role object to create this role from
     */
    constructor(client, obj) {
        this.id = obj.id;
        this._integerColor = obj.color || null;

        this.name = obj.name;
        this.hoisted = obj.hoist;
        this.position = obj.position;
        this.permissions = obj.permissions;
        this.managed = obj.managed;
        this.mentionable = obj.mentionable;
    }

    get color() {
        return this._integerColor;
    }

    get hexColor() {
        return this._integerColor; // TODO: hex color
    }
}

module.exports = Role;