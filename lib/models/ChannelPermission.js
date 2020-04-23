const { permissions: perms } = require('../util/Constants');

/**
 * Used to handle channel permissions (overwrites) exclusively
 */
class ChannelPermission {
    /**
     * Create a new channel permission handler
     * @param {*} client An existing client
     * @param {*} channel The channel to accociate this permission handler with
     * @param {*} guild The guild to accociate this permission handler with
     */
    constructor(client, channel, guild) {
        this.client = client;

        this.channel = channel;
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
     * Compute the overwrites permissions object for the member/channel
     * @param {object} member The member object
     * @param {object} guild The guild object
     */
    computeOverwrites(basePermissions, member, guild, channel) {
        if ((basePermissions & perms.ADMINISTRATOR) == perms.ADMINISTRATOR) return this.ALL;
    
        let permissions = basePermissions;

        const overwriteEveryone = channel.permissionOverwrites.get(guild.id);

        if (overwriteEveryone) {
            permissions &= ~overwrite_everyone.deny
            permissions |= overwrite_everyone.allow
        }

        let allow = null;
        let deny = null;

        for (role in member.roles) {
            const overwriteRole = channel.permissionOverwrites.get(role.id);

            if (overwriteRole) {
                allow |= overwriteRole.allow;
                deny |= overwriteRole.deny;
            }
        }
    
        permissions &= ~deny;
        permissions |= allow;
    
        const overwriteMember = channel.permissionOverwrites.get(member.user.id);

        if (overwriteMember) {
            permissions &= ~overwriteMember.deny;
            permissions |= overwriteMember.allow;
        }
    
        return permissions;
    }

    /**
     * Compute the permissions object for the member
     * @param {object} member The member object
     * @param {object} guild The guild object
     * @param {object} channel The channel object
     */
    compute(member, guild, channel) {
        const basePermissions = this.computeBase(member, guild);
        return this.computeOverwrites(basePermissions, member, guild, channel);
    }

    /**
     * Returns a boolean indicating if the member has the specified permission or not
     * @param {object} member The member to check for
     * @param {string} permission The permission name
     */
    for(member, permission) {
        const computed = this.compute(member, this.guild, this.channel);

        return (computed & perms[permission].hex) == perms[permission].hex;
    }
}

module.exports = ChannelPermission;