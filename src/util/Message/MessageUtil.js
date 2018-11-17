const clean = (text) => {
    if (typeof(text) == 'string') return text.replace(/[`@]/g, '$&\u200b');
    else return text;
};

exports.cleanMessage = async (content) => {
    const cleaned = clean(content);
    return cleaned;
}