const FormData = require("form-data");
const https = require("https");
const { UserAgent } = require("../Constants.js");
const APIResponse = require("./APIResponse.js");

class Request {

    constructor([token, endpoint, method, data, options], resolve, reject) {
        this.token = token;
        this.endpoint = endpoint;
        this.method = method;
        this.data = data;
        this.options = options;
        this.promise = { resolve, reject };
    }

    /**
     * Builds the request resolving with an APIResponse object
     * @returns {Promise<APIResponse>}
     */
    build() {
        return new Promise(resolve => {
            let headers = { // Base headers
                "User-Agent": UserAgent,
                Authorization: `Bot ${this.token}`
            };
            if (this.options.attachments) {
                const form = new FormData();
                const request = https.request({
                    host: "discordapp.com",
                    path: `/api/v6${this.endpoint.startsWith("/") ? this.endpoint : `/${this.endpoint}`}`,
                    method: this.method.toLowerCase(),
                    headers: {
                        ...headers,
                        ...form.getHeaders()
                    }
                });
                for (const attachment of this.options.attachments) form.append(attachment.name, attachment.buffer, { filename: attachment.name });
                if (this.data) form.append("payload_json", JSON.stringify(this.data), { filename: "payload_json" });
                form.pipe(request);
                request.on("response", res => {
                    const body = [];
                    res.on("data", data => body.push(data));
                    res.on("error", () => resolve(new APIResponse(request, this, "")));
                    res.on("end", () => {
                        const bodyStr = Buffer.concat(body).toString();
                        resolve(new APIResponse(request, this, bodyStr));
                    });
                });
                request.on("error", () => resolve(new APIResponse(request, this, "")));
                request.on("abort", () => resolve(new APIResponse(request, this, "")));
                request.end();
            } else {
                const request = https.request({
                    host: "discordapp.com",
                    path: `/api/v6${this.endpoint.startsWith("/") ? this.endpoint : `/${this.endpoint}`}`,
                    method: this.method.toLowerCase(),
                    headers
                });
                request.on("response", res => {
                    const body = [];
                    res.on("data", data => body.push(data));
                    res.on("error", () => resolve(new APIResponse(request, this, "")));
                    res.on("end", () => {
                        const bodyStr = Buffer.concat(body).toString();
                        resolve(new APIResponse(request, this, bodyStr));
                    });
                });
                request.on("error", () => resolve(new APIResponse(request, this, "")));
                request.on("abort", () => resolve(new APIResponse(request, this, "")));
                if (this.data) {
                    request.write(JSON.stringify(this.data));
                    request.end();
                }
            }
        });
    }

}

module.exports = Request;