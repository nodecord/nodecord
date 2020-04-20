module.exports = (...modules) => {
    for (m of modules) {
        if (exists(m)) {
            return require(m);
        }
    }
}

exports.exists = async (m) => {
    require.resolve(m).then(() => { return true; }).catch((err) => { return false; });
}