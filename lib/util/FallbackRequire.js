const exists = async (m) => {
    try {
        require.resolve(m);
    } catch(err) {
        return false;
    }
}

module.exports = (...modules) => {
    for (m of modules) {
        if (exists(m)) {
            return require(m);
        }
    }
}