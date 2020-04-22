/**
 * Represents a Discord user that belongs to a guild, known as a "member"
 */
class Member {
    /**
     * Create a new member
     * @param {*} client An existing client
     * @param {object} obj The member object to create this member from
     * @param {object} user The user object for this member
     */
    constructor(client, obj, user = undefined) {
        this.nicknake = obj.nick;
        this.roles = obj.roles; // todo: role collection
        this.joinedAt = new Date(obj.joined_at);
        this.boost = {
            boosting: obj.premium_since !== false ? true : false,
            since: new Date(obj.premium_since) || null
        }
        this.deafened = obj.deaf;
        this.muted = obj.mute;

        this.user = user;
    }
}

module.exports = Member;