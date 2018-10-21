const p = require('phin').promisified;

module.exports = async (client) => {
    if (client.ws.heartbeat.recieved == false) throw new Error(`Last heartbeat hasn't been acknowledged, terminating connection`);
    setInterval(() => {
        client.ws.socket.send(JSON.stringify({
            op: 1,
            d: 0
        }));

        client.ws.heartbeat.recieved = false;
    }, client.ws.heartbeat.interval);
}