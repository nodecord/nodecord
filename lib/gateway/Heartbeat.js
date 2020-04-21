const Gateway = require('./Gateway');

module.exports = async (client) => {
    client.ws.heartbeat.timer = setInterval(() => {
        if (!client.ws.heartbeat.recieved) {
            client.emit('disconnect', null);

            client.ws.socket.close();

            if (client.ws.heartbeat.timer) clearInterval(client.ws.heartbeat.timer);

            client.ws.url = null;
            client.ws.socket = null;
            client.ws.heartbeat = null;
            client.ws.version = null;
            client.ws.handler = null;

            Gateway(client, true);
        }

        client.ws.socket.send(JSON.stringify({
            op: 1,
            d: client.ws.sequence 
        }));

        client.emit('debug', 'Sent heartbeat');

        client.ws.heartbeat.recieved = false;
    }, client.ws.heartbeat.interval);
}