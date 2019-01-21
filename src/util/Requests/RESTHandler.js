const Request = require("./Request.js");
const APIError = require("./APIError.js");

/**
 * This class is used for the Client instance.
 * 
 * @example
 * const member = await client.rest.get("/guilds/GuildID/members/MemberID");
 * return member;
 */
class RESTHandler {

    /**
     * The constructor to construct the RESTHandler.
     * @param {Client} client The Client instance.
     */
    constructor(client) {
        /**
         * The client instance.
         * @type {Client}
         */
        Object.defineProperty(this, "client", { value: client, writable: false });

        /**
         * A boolean determining wether or not the ratelimit queue is running a active timeout.
         * @type {boolean}
         */
        this.handling = false;

        /**
         * The ratelimit queue of requests.
         * @type {Request[]}
         */
        this._ratelimits = [];
    }

    /**
     * Adds a request to the ratelimit queue.
     * @param {token} token The request token.
     * @param {string} endpoint The request endpoint.
     * @param {string} method The request method.
     * @param {object} data The request data.
     * @param {object} options The request options.
     * @returns {Promise<any>}
     */
    queueRequest(token, endpoint, method, data, options) {
        return new Promise((resolve, reject) => {
            this._ratelimits.push(new Request([token, endpoint, method, data, options], resolve, reject));
            this.handle();
        });
    }

    /**
     * Executes the provided request.
     * @param {Request} req The request to execute.
     * @returns {Promise<any>}
     */
    executeRequest(req) {
        this.handling = true;
        return new Promise(resolve => {
            req.build().then(res => {
                if (res.ok) {
                    res.req.promise.resolve(res.body);
                    return resolve();
                } else {
                    if (res.status === 429) {
                        this._ratelimits.unshift(res.req);
                        setTimeout(() => resolve(), res.headers["retry-after"]);
                        return;
                    }
                    // res.req is weird ik
                    res.req.promise.reject(new APIError(
                        res.getErrors(),
                        res.req.endpoint,
                        res.req.method,
                        res.req.data,
                        res.req.options
                    ));
                    resolve();
                }
            });
        });
    }

    /**
     * Handles ratelimits in a nice way.
     * Shifting each ratelimit as it goes.
     */
    handle() {
        if(this.handling || this._ratelimits.length === 0) return;
        this.executeRequest(this._ratelimits.shift()).then(() => {
            this.handling = false;
            this.handle();
        });
    }

    /**
     * Requests a discord endpoint.
     * @param {string} endpoint The endpoint to request
     * @param {string} method The method example get
     * @param {object} data The provided request data.
     * @param {object} [options={}] The optional options object.
     * @returns {Promise<any>}
     */
    request(endpoint, method, data, options = {}) {
        return this.queueRequest(this.client.token, endpoint, method, data, options);
    }

    /**
     * Sends a GET request to discord.
     * @param {string} endpoint The endpoint to GET from.
     * @returns {Promise<any>}
     */
    get(endpoint) {
        return this.request(endpoint, "get");
    }

    /**
     * Sends a GET request but with the given query.
     * @param {string} endpoint The endpoint to GET from.
     * @param {string} query The given query.
     * @returns {Promise<any>}
     */
    getQuery(endpoint, query) {
        return this.request(endpoint, "get", null, query);
    }

    /**
     * Sends a POST request to discord.
     * @param {string} endpoint The endpoint to POST to.
     * @param {object} body The post body.
     * @param {object} options The post options.
     * @returns {Promise<any>}
     */
    post(endpoint, body, options = {}) {
        return this.request(endpoint, "post", body, options);
    }

    /**
     * Sends a PUT request to discord.
     * @param {string} endpoint The endpoint to POST to.
     * @param {object} body The post body.
     * @param {object} options The put options.
     * @returns {Promise<any>}
     */
    put(endpoint, body, options = {}) {
        return this.request(endpoint, "put", body, options);
    }

    /**
     * Sends a PATCH request to discord.
     * @param {string} endpoint The endpoint to POST to.
     * @param {object} body The post body.
     * @param {object} options The patch options.
     * @returns {Promise<any>}
     */
    patch(endpoint, body, options = {}) {
        return this.request(endpoint, "patch", body, options);
    }

    /**
     * Sends a DELETE request to discord.
     * @param {string} endpoint The endpoint to POST to.
     * @param {object} options The patch options.
     * @returns {Promise<any>}
     */
    delete(endpoint, options = {}) {
        return this.request(endpoint, "delete", null, options);
    }

}

module.exports = RESTHandler;
