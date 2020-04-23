const Request = require('phin');
const { baseURL } = require('./Constants');

/**
 * Used to handle requests to the Discord REST API
 */
class RESTHandler {

    /**
     * Create a new REST handler
     * @param {*} client An existing client
     */
    constructor(client) {
        this.client = client;
        this.working = false;
    }

    /**
     * Requests an endpoint
     * @param {string} [method='get'] The method to request with
     * @param {string} endpoint The endpoint to request
     * @param {object} data The provided request data
     * @param {object} [options={}] An optional options object
     */
    request(method = 'get', endpoint, data, options = {}) {
        this.working = true;

        return new Promise(async (resolve, reject) => {
            try {
                const response = await Request({
                    method: method,
                    url: `${baseURL}/${endpoint}`,
                    parse: method === 'delete' ? null : 'json',
                    headers: {
                        'Authorization': `Bot ${this.client.token}`
                    },
                    data: data || null
                });

                if (response.statusCode === 429) {
                    reject(`Ratelimited`);
                }

                resolve(response.body);
            } catch(err) {
                reject(err);
            }
        });
    }

    /**
     * Send a GET request
     * @param {string} endpoint The endpoint to GET from
     */
    get(endpoint) {
        return this.request('get', endpoint);
    }
    /**
     * Send a POST request
     * @param {string} endpoint The endpoint to POST to
     * @param {object} body The request body
     * @param {object} options The request options
     */
    post(endpoint, body, options = {}) {
        return this.request('post', endpoint, body, options);
    }

    /**
     * Send a PUT request
     * @param {string} endpoint The endpoint to POST to.
     * @param {object} body The request body
     * @param {object} options The request options
     */
    put(endpoint, body, options = {}) {
        return this.request('put', endpoint, body, options);
    }

    /**
     * Sends a PATCH request
     * @param {string} endpoint The endpoint to PATCH to.
     * @param {object} body The request body
     * @param {object} options The request options
     */
    patch(endpoint, body, options = {}) {
        return this.request('patch', endpoint, body, options);
    }

    /**
     * Sends a DELETE request
     * @param {string} endpoint The endpoint to DELETE to
     * @param {object} options The request options
     */
    delete(endpoint, options = {}) {
        return this.request('delete', endpoint, null, options);
    }

}

module.exports = RESTHandler;