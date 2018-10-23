module.exports = class MessageEmbed {
    constructor() {
        return;
    }

    title(str) {
        if (!str || str == '') throw new TypeError(`Message embed titles cannot be empty`);

        this.title = `${str}`;
        return this;
    }

    color(color) {
        if (!color || color.length == 0) throw new TypeError(`Message embed colors must be a hex code or integer`);

        this.color = parseInt(/[0-9A-F]{6}/i.exec(color)[0], 16);
        return this;
    }

    pack() {
        let Embed = new Object();

        for (const [key, value] of Object.entries(this)) {
            Embed[key] = value;
        }

        return Embed;
    }
}