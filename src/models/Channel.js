module.exports = class Channel {
    constructor(obj) {
        for (const [key, value] of Object.entries(obj)) {
            this[key] = value;
        }

        switch(this.type) {
            case 0: this.type = 'text'; break;
            case 1: this.type = 'dm'; break;
            case 2: this.type = 'voice'; break;
            case 3: this.type = 'dm_group'; break;
            case 4: this.type = 'category'; break;
        }
    }
}