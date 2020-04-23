const { embedColors } = require('../util/Constants');

/**
 * Represents an embed that can be sent as a message
 */
class Embed {
    /**
     * Create a new embed
     * @param {object} [iterable=undefined] An existing embed object
     */
    constructor(iterable = undefined) {
       
        this.fields = [];

        if (iterable !== undefined) {
            // TODO: prefill values
        }
    }

    /**
     * Set the embed's title
     * @param {string} str Embed title, maximum length of 256 characters
     */
    title(str) {
        if (!str || str == '') throw new TypeError(`Message embed titles cannot be empty`);
        if (str.split('').length > 256) throw new TypeError(`Message embed titles cannot be over 256 characters`);

        this.title = `${str}`;
        return this;
    }

    /**
     * Set the embed's description
     * @param {string} str Embed description, maximum length of 2048 characters
     */
    description(str) {
        if (!str || str == '') throw new TypeError(`Message embed descriptions cannot be empty`);
        if (str.split('').length > 2048) throw new TypeError(`Message embed descriptions cannot be over 2048 characters`);

        this.description = `${str}`;
        return this;
    }

    /**
     * Set the embed's color
     * @param {string|number} color Embed hex code, numeric colour value or predefined color
     */
    color(color) {
        if (!color || color.length == 0) throw new TypeError(`Message embed colors must be a hex code, integer, or predefined code`);

        if (!embedColors[color]) {
            this.color = parseInt(/[0-9A-F]{6}/i.exec(color)[0], 16);
        } else {
            this.color = this.color = parseInt(/[0-9A-F]{6}/i.exec(embedColors[color])[0], 16);
        }

        return this;
    }

    /**
     * Set the embed's timestamp
     * @param {date} date Date object or ISO8601 date timestamp
     */
    timestamp(date) {
        if (!date) {
            this.timestamp = new Date();
        } else {
            this.timestamp = date;
        }

        return this;
    }

    /**
     * Add a field to the embed
     * @param {string} name Embed field name
     * @param {string} value Embed field value
     * @param {boolean} [inline=false] Whether this field should be inline with other inline fields or not
     */
    field(name, value, inline) {
        if (!name || name == '') throw new TypeError(`Message embed field names cannot be empty`);
        if (!value || value == '') throw new TypeError(`Message embed field values cannot be empty`);
        let _inline = false;
        if (inline && typeof (inline) == 'boolean') _inline = inline;

        this.fields.push({
            name: `${name}`,
            value: `${value}`,
            inline: _inline
        });

        return this;
    }

    /**
     * Set the embed's author
     * @param {string} str Embed author name
     * @param {string} [avatarURL=undefined] Embed author avatar URL
     * @param {string} [url=undefined] Embed author link/URL
     */
    author(str, avatarURL = undefined, url = undefined) {
        if (!str || str == '') throw new TypeError(`Message embed author name cannot be empty`);
        if (str.split('').length > 256) throw new TypeError(`Message embed author name cannot be over 256 characters`);

        let icon_url = null;
        if (avatarURL && typeof (avatarURL) == 'string') icon_url = avatarURL;

        let _url = null;
        if (url && typeof (url) == 'string') _url = url;

        this.author = {
            name: str || null,
            icon_url,
            url: _url
        }

        return this;
    }

    /**
     * Set the embed's footer
     * @param {string} str Embed footer text
     * @param {string} [iconURL=undefined] EMbed footer icon URL
     */
    footer(str, iconURL = undefined) {
        if (!str || str == '') throw new TypeError(`Message embed footer text cannot be empty`);
        if (str.split('').length > 2048) throw new TypeError(`Message embed footer text cannot be over 2048 characters`);

        let icon_url = null;
        if (iconURL && typeof (iconURL) == 'string') icon_url = iconURL;

        this.footer = {
            text: `${str}`,
            icon_url: icon
        }

        return this;
    }

    /**
     * Set the embed's image
     * @param {string} url Embed image URL
     */
    image(url) {
        if (!url || url == '') throw new TypeError(`Message embed image URL is required`);

        this.image = { url: url };
        return this;
    }

    /**
     * Set the embed's thumbnail
     * @param {string} url Embed thumbnail URL
     */
    thumbnail(url) {
        if (!url || url == '') throw new TypeError(`Message embed thumbnail URL is required`);

        this.thumbnail = { url: url };
        return this;
    }

    /**
     * Turns the embed into a plain JSON object
     */
    toJSON() {
        return {
            title: this.title,
            description: this.description,
            url: this.url,
            timestamp: this.timestamp,
            color: this.color,
            fields: this.fields,
            thumbnail: this.thumbnail,
            image: this.image,
            author: this.author || null,
            footer: this.footer || null
        }
    }
}

module.exports = Embed;