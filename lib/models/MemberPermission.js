const { permissions: perms } = require('../util/Constants');

/**
 * Used to handle member permissions exclusively
 */
class MemberPermission {
    /**
     * Create a new member permission handler
     * @param {object} client An existing client
     * @param {object} member The member to accociate this permission handler with
     * @param {object} guild The guild to accociate this permission handler with
     */
    constructor(client, member, guild) {
        this.client = client;

        this.member = member;
        this.guild = guild;

        this.ALL = Object.values(perms).map((permission) => permission.hex).reduce((x, y) => x | y);
    }

    /**
     * Compute the base permissions object for the member/guild
     * @param {object} member The member object
     * @param {object} guild The guild object
     */
    computeBase(member, guild) {
        if (member.user.id === guild.ownerID) return this.ALL;

        const everyoneRole = guild.roles.get(guild.id);

        let permissions = everyoneRole.permissions;

        for (const role in member.roles) {
            permissions |= role.permissions;
        }

        if ((permissions & perms.ADMINISTRATOR) == perms.ADMINISTRATOR) return this.ALL;

        return permissions;
    }

    /**
     * Compute the permissions object for the member
     * @param {object} member The member object
     * @param {object} guild The guild object
     */
    compute(member, guild) {
        return this.computeBase(member, guild);
    }

    /**
     * Returns a boolean indicating if the member has the specified permission or not
     * @param {string} permission The permission name
     */
    has(permission) {
        const computed = this.compute(this.member, this.guild);

        return (computed & perms[permission].hex) == perms[permission].hex;
    }
}

module.exports = MemberPermission;