const { PERMISSIONS } = require("../util/Constants.js");

/**
 * Represents a members/roles current permissions.
 */
class Permissions {

    /**
     * @typedef {object} Perm
     * @property {string} flag The permission flag.
     * @property {number} bit The permission integer.
     */

    constructor(total, all = false) {
        /**
         * The total permission bits for the role/member.
         */
        this.total = all ? PERMISSIONS.ALL : total || 0;
        /**
         * Represents every single permission.
         */
        this.all = all;
    }

    valueOf() {
        return this.total;
    }

    /**
     * Checks if the user has a specific permission.
     * @param {string|Array<string>} perms The permission(s) to check.
     * @example
     * const member = client.guilds.first().members.first();
     * member.perms.has("ADMINISTRATOR");
     * @returns {Boolean}
     */
    has(perms) {
        if (Array.isArray(perms)) {
            const results = perms.map(p => this.has(p));
            if (results.includes(r => !Boolean(r))) return false;
            return true;
        } else {
            if (!PERMISSIONS[perms.toUpperCase()]) throw new Error("Invalid permission passed");
            return Boolean(this.total & PERMISSIONS[perms.toUpperCase()]);
        }
    }

    /**
     * Adds a permission to the total perms.
     * This does not affect the channel/member/role in anyway.
     * @param {string|number} perm The permission to add.
     * @returns {this}
     */
    add(perm) {
        if (!PERMISSIONS[perm.toUpperCase()] || typeof perm !== "number") throw new Error("Invalid permission passed");
        this.total |= PERMISSIONS[perm.toUpperCase()];
        return this;
    }

    /**
     * Removes a permission from the total.
     * This does not affect the channel/member/role in anyway.
     * @param {string|number} perm The permission to remove.
     * @returns {this}
     */
    remove(perm) {
        if (!PERMISSIONS[perm.toUpperCase()] || typeof perm !== "number") throw new Error("Invalid permission passed");
        this.total &= ~perm;
        return this;
    }

    /**
     * Gets the allowed permissions for the role/channel/member.
     * @returns {Array<{ flag: string, bit: number }>}
     */
    get allowed() {
        return Permissions.allowed(this.total);
    }

    /**
     * Gets the denied permissions for the role/channel/member.
     * @returns {Array<{ flag: string, bit: number }>}
     */
    get denied() {
        return Permissions.denied(this.total);
    }

}

/**
 * Gets the allowed permissions for a member/role.
 * @param {number} bits The total bits.
 * @returns {Perm[]}
 */
Permissions.allowed = (bits) => {
    const allowed = [];
    for (const [flag, bit] of Object.entries(PERMISSIONS)) {
        if ((bits & bit)) allowed.push({ flag, bit });
    }
    return allowed;
};

/**
 * Gets the denied permissions for a member/role.
 * @param {number} bits The total bits.
 * @returns {Perm[]}
 */
Permissions.denied = (bits) => {
    const denied = [];
    for (const [flag, bit] of Object.entries(PERMISSIONS)) {
        if (!(bits & bit)) denied.push({ flag, bit });
    }
    return denied;
};

/**
 * Resolves an array of permissions into an integer.
 * @param {string[]} perms The array of permissions.
 * @returns {number}
 */
Permissions.resolve = (perms) => {
    let total = 0;
    const keys = Object.keys(PERMISSIONS);
    for (const perm of perms) {
        if (!keys.includes(perm)) throw new Error(`Invalid permission at index: ${perms.indexOf(perm)+1}`);
        total |= PERMISSIONS[perm];
    }
    return total;
};

/**
 * Merges the provided allowed/denied permission for a role/member.
 * @param {string[]} allow The allowed perms.
 * @param {string[]} deny The denied perms.
 * @param {boolean} [all] If all permissions are present.
 * @returns {number}
*/
Permissions.merge = (allow, deny, all = false) => {
    let perms = 0;
    perms &= ~Permissions.resolve(deny);
    perms |= Permissions.resolve(allow);
    if (all) return PERMISSIONS.ALL;
    return perms;
};

module.exports = Permissions;