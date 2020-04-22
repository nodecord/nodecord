const ws = require('ws');
const Request = require('phin');
const EventHandler = require('../gateway/EventHandler');
const { baseURL, opcodes } = require('../util/Constants');

/**
 * Used to handle all Gateway communication, event handoff, logging in, heartbeating and resuming
 */
class Gateway {
    constructor(client) {
        client.ws = {
            url: null,
            socket: null,
            heartbeat: null,
            sequence: null,
            handler: new EventHandler(client)
        }

        this.client = client;
    }

    async handle(resume = false) {
        const url = await this.getGatewayBot();

        this.client.ws.url = url;
        this.client.emit('debug', `Using gateway URL: ${url}/?v=6&encoding=json`);

        this.socket = new ws(`${url}/?v=6&encoding=json`);

        this.socket.on('message', (message) => {
            const { op, d, t = null, s = null } = JSON.parse(message);
    
            if (op === opcodes.DISPATCH) {
                this.client.ws.sequence = s;
    
                this.client.emit('debug', `Received event: ${t}`);
    
                if (this.client.options.ignoredEvents === undefined) {
                    this.client.ws.handler.handle(t, d);
                } else {
                    if (this.client.options.ignoredEvents.length && (this.client.options.ignoredEvents.length.has(t))) return;
    
                    this.client.ws.handler.handle(t, d);
                }
            }
    
            if (op === opcodes.RECONNECT) {
                this.client.emit('debug', 'Requested to reconnect, reconnecting');
                this.resume();
            }
    
            if (op === opcodes.INVALID_SESSION) {
                this.client.emit('debug', `Session invalidated`);
    
                setTimeout(() => {
                    this.socket.send(JSON.stringify({
                        op: 2,
                        d: {
                            token: this.client.token,
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
                this.client.ws.heartbeat = {
                    interval: d.heartbeat_interval,
                    recieved: true
                }
    
                this.heartbeat();
                this.client.emit('debug', 'Started heartbeating');
    
                if (resume) {
                    this.socket.send(JSON.stringify({
                        op: opcodes.RESUME,
                        d: {
                            token: this.client.token,
                            session_id: this.client.ws.sessionID,
                            seq: this.client.ws.sequence
                        }
                    }));
                } else {
                    this.socket.send(JSON.stringify({
                        op: opcodes.IDENTIFY,
                        d: {
                            token: this.client.token,
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
                this.client.ws.heartbeat.recieved = true;
                this.client.emit('debug', 'Heartbeat acknowledged');
            }
        });
    }

    heartbeat() {
        this.client.ws.heartbeat.timer = setInterval(async () => {
            if (!this.client.ws.heartbeat.recieved) {
                this.client.emit('debug', 'Heartbeat not acknowledged, attempting to resume');
    
                this.resume();
            }
    
            this.socket.send(JSON.stringify({
                op: 1,
                d: this.client.ws.sequence 
            }));
    
            this.client.emit('debug', 'Sent heartbeat');
    
            this.client.ws.heartbeat.recieved = false;
        }, this.client.ws.heartbeat.interval);
    }

    async getGatewayBot() {
        try {
            const { body } = await Request({
                url: `${baseURL}/gateway/bot`,
                parse: 'json',
                headers: {
                    'Authorization': `Bot ${this.client.token}`
                }
            });
    
            return body.url;
        } catch(err) {
            throw new Error(err);
        }
    }

    connect() {
        this.handle();
    }

    resume() {
        this.client.ws.socket.close();
        this.client.emit('disconnect', null);

        if (client.ws.heartbeat.timer) clearInterval(client.ws.heartbeat.timer);

        this.client.ws.url = null;
        this.client.ws.socket = null;
        this.client.ws.heartbeat = null;
        this.client.ws.version = null;
        this.client.ws.handler = null;
        this.socket = null;

        this.handle(true);
    }
}

module.exports = Gateway;