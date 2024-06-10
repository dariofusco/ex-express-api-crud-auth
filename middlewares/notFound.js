module.exports = (req, res, next) => {
    res.status(404).send("Questa rotta non esiste");
    next();
}