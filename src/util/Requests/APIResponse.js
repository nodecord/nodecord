const { STATUS_CODES } = require("http");

class APIResponse {

    constructor(req, res, body) {
        this.req = req;
        this.body = res.headers["content-type"] && res.headers["content-type"].search(/application\/json/) > -1 ?
            JSON.parse(body) :
            body;
        this.status = res.statusCode || 0;
        this.statusText = STATUS_CODES[this.status] || "";
        this.ok = this.status >= 200 && this.status < 400;
    }

    getErrors() {
        if (this.body.message) return this.body.message;
        return JSON.stringify(this.body); // Flatten errors later
    }

}

module.exports = APIResponse;