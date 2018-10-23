module.exports = class MessageEmbed {
    constructor() {
        return;
    }

    setTitle(str) {
        if (!str || str == '') throw new TypeError(`Message embed titles cannot be empty`);

        this.title = `${str}`;
        return this;
    }
}