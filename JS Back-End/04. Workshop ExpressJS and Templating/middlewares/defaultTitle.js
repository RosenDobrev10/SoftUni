module.exports = (defaultTitle) => (req, res, next) => {
    res.locals.title = defaultTitle;
    next();
};