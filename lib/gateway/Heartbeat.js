module.exports = async (client) => {
    setInterval(() => {
        if (!client.ws.heartbeat.recieved) {
            throw new Error(`Last heartbeat hasn't been acknowledged, terminating connection`);
        }

        client.ws.socket.send(JSON.stringify({
            op: 1,
            d: client.ws.sequence 
        }));

        client.ws.heartbeat.recieved = false;
    }, client.ws.heartbeat.interval);
}