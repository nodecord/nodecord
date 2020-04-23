/**
 * Used to handle bot/member permissions and channel permission overrides
 */
class PermissionsHandler {
    /**
     * Create a new permissions handler
     * @param {*} client An existing client
     */
    constructor(client) {
        this.client = client;
    }

}

module.exports = PermissionsHandler;