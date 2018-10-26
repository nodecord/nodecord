const colors = {
    'BLUE': '#0000ff',
    'RED': '#ff0000',
    'YELLOW': '#ffff00',
    'GREEN': '#00ff00',
}

module.exports = class MessageEmbed {
    constructor() { this.fields = []; }

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
        if (!color || color.length == 0) throw new TypeError(`Message embed colors must be a hex code, integer, or predefined code`);

        if (!colors.hasOwnProperty(color)) {
            this.color = parseInt(/[0-9A-F]{6}/i.exec(color)[0], 16);
        } else {
            this.color = this.color = parseInt(/[0-9A-F]{6}/i.exec(colors[color])[0], 16);
        }

        return this;
    }

    timestamp(date) {
        if (!date) {
            this.timestamp = new Date();
        } else {
            this.timestamp = date;
        }

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

    author(str, url) {
        if (!str || str == '') throw new TypeError(`Message embed author name cannot be empty`);
        if (str.split('').length > 256) throw new TypeError(`Message embed author name cannot be over 256 characters`);

        let icon = null;
        if (url && typeof (url) == 'string') icon = url;

        this.author = {
            name: `${str}`,
            icon_url: icon
        }

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

    image(url) {
        if (!url || url == '') throw new TypeError(`Message embed image URL is required`);

        this.image = { url: url };
        return this;
    }

    thumbnail(url) {
        if (!url || url == '') throw new TypeError(`Message embed thumbnail URL is required`);

        this.thumbnail = { url: url };
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