const Store = require('../util/Store');

module.exports = {
    'ready': (client, d) => {
        client.user = d.d.user;
        client.readyAt = Date.now();

        for (const [obj] in d.d.guilds) {
            client.guilds.set(d.d.guilds[obj].id, { u: true });
        }

        client.emit('ready', null);
    },

    'guildCreate': (client, d) => {
        if (client.guilds.has(d.d.id) && client.guilds.get(d.d.id).u == true) {
            let obj = d.d;

            let channels = new Store();
            for (const channel of data.d.channels) {
                ch.set(channel.id, channel);
                Client.channels.set(channel.id, channel);
            }

            let users = new Store();
            for (const member of data.d.members) {
                us.set(member.user.id, member.user);
                Client.channels.set(member.user.id, member.user);
            }

            obj.channels = channels;
            obj.users = users;

            client.guilds.set(d.d.id, obj);
            client.emit('guildAvailable', obj);
        } else {
            
        }
    }
}