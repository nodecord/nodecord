module.exports = class Store extends Map {
    constructor(...args) {
        super(args);
    }

    map(callback) {
        let output = new Store();
        
        this.forEach((key, value) => {
            output.set(value, callback(key, value));
        });

        return output;
    }
}