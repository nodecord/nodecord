const Store = require('../util/Store');

module.exports = {
    'ready': (client, d) => {
        client.user = d.d.user;
        client.sessionId = d.d.session_id;

        for (const [obj] in d.d.guilds) {
            client.guilds.set(d.d.guilds[obj].id, { ready: false });
        }

        client.emit('ready');
    },

    'guildCreate': (client, d) => {
        let obj = d.d;

        let channels = new Store();
        for (const channel of d.d.channels) {
            channels.set(channel.id, channel);
            client.channels.set(channel.id, channel);
        }

        let members = new Store();
        for (const member of d.d.members) {
            members.set(member.user.id, member.user);
            client.users.set(member.user.id, member.user);
        }

        if (client.guilds.has(d.d.id) && client.guilds.get(d.d.id).ready == false) {
            obj.channels = channels;
            obj.members = members;

            obj.ready = true;

            client.guilds.set(d.d.id, obj);
            client.emit('guildAvailable', obj);
        } else {
            client.guilds.set(d.d.id, obj);
            client.emit('guildCreate', obj);
        }
    },

    'message': (client, d) => {
        let Message = require('../models/Message');

        let msg = new Message(d.d, {
            guild: client.guilds.get(d.d.guild_id),
            channel: client.channels.get(d.d.channel_id)
        }, client);

        client.emit('message', msg);
    }
}