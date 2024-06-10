const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const store = async (req, res, next) => {

    const { name } = req.body;

    const data = { name }

    try {
        const category = await prisma.category.create({ data });
        res.status(200).send(category);
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const index = async (req, res, next) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const show = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const category = await prisma.category.findUnique({
            where: { id }
        });
        res.json(category);
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const update = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const category = await prisma.category.update({
            where: { id },
            data: req.body,
        });
        res.json(category);
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const destroy = async (req, res, next) => {

    try {
        const id = parseInt(req.params.id);
        await prisma.category.delete({
            where: { id },
        });
        res.json(`La Category con id ${id} è stata eliminata.`);
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

module.exports = {
    store,
    index,
    show,
    update,
    destroy
}

