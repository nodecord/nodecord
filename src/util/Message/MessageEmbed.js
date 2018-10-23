module.exports = class MessageEmbed {
    constructor() {
        this.fields = [];
    }

    title(str) {
        if (!str || str == '') throw new TypeError(`Message embed titles cannot be empty`);
        if (str.split('').length > 256) throw new TypeError(`Message embed titles cannot be over 256 characters`);

        this.title = `${str}`;
        return this;
    }

    description(str) {
        if (!str || str == '') throw new TypeError(`Message embed descriptions cannot be empty`);
        if (str.split('').length > 2048) throw new TypeError(`Message embed descriptions cannot be over 2048 characters`);

        this.description = `${str}`;
        return this;
    }

    color(color) {
        if (!color || color.length == 0) throw new TypeError(`Message embed colors must be a hex code or integer`);

        this.color = parseInt(/[0-9A-F]{6}/i.exec(color)[0], 16);
        return this;
    }

    field(name, value, inl) {
        if (!name || name == '') throw new TypeError(`Message embed field names cannot be empty`);
        if (!value || value == '') throw new TypeError(`Message embed field values cannot be empty`);
        let inline = false;
        if (inl && typeof (inl) == 'boolean') inline = inl;

        this.fields.push({
            name: `${name}`,
            value: `${value}`,
            inline: inline
        });

        return this;
    }

    footer(str, url) {
        if (!str || str == '') throw new TypeError(`Message embed footer text cannot be empty`);
        if (str.split('').length > 2048) throw new TypeError(`Message embed footer text cannot be over 2048 characters`);

        let icon = null;
        if (url && typeof (url) == 'string') icon = url;

        this.footer = {
            text: `${str}`,
            icon_url: icon
        }

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