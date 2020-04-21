const ws = require('ws');

const getGatewayBot = require('./getGatewayBot');
const Heartbeat = require('./Heartbeat');
const EventHandler = require('../gateway/EventHandler');
const { opcodes } = require('../util/Constants');

module.exports = async (client, resume = false) => {
    const url = await getGatewayBot(client.token);

    client.emit('debug', `Using gateway URL: ${url}/?v=6&encoding=json`);

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

        if (op === opcodes.DISPATCH) {
            client.ws.sequence = s;

            client.emit('debug', `Received event: ${t}`);

            if (client.options.ignoredEvents === undefined) {
                client.ws.handler.handle(t, d);
            } else {
                if (client.options.ignoredEvents.has(t)) return;

                client.ws.handler.handle(t, d);
            }
        }

        if (op === opcodes.INVALID_SESSION) {
            client.emit('debug', `Session invalidated`);

                setTimeout(() => {
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
                }, Math.floor(Math.random() * (5000 - 1000 + 1) + 1000));
        }

        if (op === opcodes.HELLO) {
            client.ws.heartbeat = {
                interval: d.heartbeat_interval,
                recieved: true
            }

            Heartbeat(client);

            client.emit('debug', 'Started heartbeating');

            if (resume) {
                socket.send(JSON.stringify({
                    op: opcodes.RESUME,
                    d: {
                        token: client.token,
                        session_id: client.ws.sessionID,
                        seq: client.ws.sequence
                    }
                }));
            } else {
                socket.send(JSON.stringify({
                    op: opcodes.IDENTIFY,
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

        if (op === opcodes.HEARTBEAT_ACK) {
            client.ws.heartbeat.recieved = true;

            client.emit('debug', 'Heartbeat acknowledged');
        }
    });
}