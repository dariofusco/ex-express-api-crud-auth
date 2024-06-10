module.exports = (err, req, res, next) => {
    console.error(err)
    const statusCode = 500;
    res.status(statusCode).json({ statusCode, error: err.message, stack: err.stack })
}