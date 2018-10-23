const ws = require('ws');
const { getGatewayBot } = require('../util/Gateway');

module.exports = async (client) => {
    const gatewayUrl = await getGatewayBot(client.token);
    client.ws.gateway = {
        url: gatewayUrl,
        obtainedAt: Date.now()
    };

    const socket = new ws(`${gatewayUrl}/?v=7&encoding=json`);
    client.ws.socket = socket;
    socket.on('message', (incoming) => {
        const d = JSON.parse(incoming) || incoming;

        switch(d.op) {
            case 10: /* hello */
                client.ws.gateway.heartbeat = {
                    interval: d.d.heartbeat_interval,
                    last: null,
                    recieved: true
                };

                require('./heartbeat')(client);

                socket.send(JSON.stringify({
                    op: 2,
                    d: {
                        token: client.token,
                        properties: {
                            $os: process.platform,
                            $browser: 'nodecord',
                            $device: 'nodecord',
                        },
                        compress: false,
                        large_threshold: 250,
                        presence: {
                            status: 'online',
                            afk: false,
                        }
                    }
                }));
                break;

            case 11: /* heartbeak ack */
                client.ws.gateway.heartbeat.last = Date.now();
                client.ws.gateway.heartbeat.recieved = true;
                break;
            case 0: /* event */
                let Events = require('../util/GatewayEvents');
                if (!Events.hasOwnProperty(d.t)) return;

                if (d.t == 'READY') {
                    client.readyAt = Date.now();
                }
                
                let e = require('./EventsHandler')[Events[d.t]];
                if (e) {
                    e(client, d);
                }
                break;
        }
    });
}

