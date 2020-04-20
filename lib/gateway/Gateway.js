const ws = require('ws');

const getGatewayBot = require('./getGatewayBot');
const Heartbeat = require('./Heartbeat');
const EventHandler = require('../gateway/EventHandler');

module.exports = async (client, resume = false) => {
    const url = await getGatewayBot(client.token);

    const socket = new ws(`${url}/?v=6&encoding=json`);

    client.ws = {
        url,
        socket,
        heartbeat: null,
        sequence: null,
        handler: new EventHandler(client)
    }

    socket.on('message', (message) => {
        const { op, d, t = null, s = null } = JSON.parse(message);

        if (op === 0) {
            client.ws.sequence = s;

            client.ws.handler.handle(t, d);

            client.emit('debug', `Received event: ${t}`);
        }

        if (op === 10) {
            client.ws.heartbeat = {
                interval: d.heartbeat_interval,
                last: null,
                recieved: true
            }

            Heartbeat(client);

            client.emit('debug', 'Started heartbeating');

            if (resume) {
                socket.send(JSON.stringify({
                    op: 6,
                    d: {
                        token: client.token,
                        session_id: client.ws.sessionID,
                        seq: client.ws.sequence
                    }
                }));
            } else {
                socket.send(JSON.stringify({
                    op: 2,
                    d: {
                        token: client.token,
                        properties: {
                            $os: process.platform,
                            $browser: 'nodecord',
                            $device: 'nodecord',
                        }
                    }
                }));
            }
        }

        if (op === 11) {
            client.ws.heartbeat.recieved = true;

            client.emit('debug', 'Recieved heartbeat');
        }
    });
}