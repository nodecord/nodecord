class APIError {

    constructor(message, endpoint, method, code, data, options) {
        super(message);
        this.name = "APIError";
        this.error = "APIError";
        this.endpoint = endpoint;
        this.method = method;
        this.code = code;
        this.data = data;
        this.options = options;
    }

}

module.exports = APIError;