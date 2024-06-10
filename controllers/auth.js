const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

require("dotenv").config();

const { hashPassword, comparePassword } = require("../utils/password.js");
const generateToken = require("../utils/generateToken.js");

const register = async (req, res, next) => {

    try {
        const { email, name, password } = req.body;

        const data = {
            email,
            name,
            password: await hashPassword(password),
        }

        const user = await prisma.user.create({ data });

        const token = generateToken({
            email: user.email,
            name: user.name
        });

        delete user.id;
        delete user.password;

        res.json({ token, data: user });

    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const login = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).send('Credenziali errate.');
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(404).send('Credenziali errate.');
        }

        const token = generateToken({
            email: user.email,
            name: user.name
        });

        delete user.id;
        delete user.password;

        res.json({ token, data: user });

    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

module.exports = {
    register,
    login
}