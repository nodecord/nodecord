const ws = require('ws');

const getGatewayBot = require('./getGatewayBot');
const Heartbeat = require('./Heartbeat');
const EventHandler = require('../gateway/EventHandler');

module.exports = async (client) => {
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
        }

        if (op === 10) {
            client.ws.heartbeat = {
                interval: d.heartbeat_interval,
                last: null,
                recieved: true
            }

            Heartbeat(client);

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

        if (op === 11) {
            // TODO:
            // If a client does not receive a heartbeat ack between its attempts at sending heartbeats, it should
            // immediately terminate the connection with a non-1000 close code, reconnect, and attempt to resume.
        }
    });
}