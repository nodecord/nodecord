module.exports = class Guild {
    constructor(obj) {
        for (const [key, value] of Object.entries(obj)) {
            this[key] = value;
        }
    }
}