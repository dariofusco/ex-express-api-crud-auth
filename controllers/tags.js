const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const store = async (req, res, next) => {

    const { name } = req.body;

    const data = { name }

    try {
        const tag = await prisma.tag.create({ data });
        res.status(200).send(tag);
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const index = async (req, res, next) => {
    try {
        const tags = await prisma.tag.findMany();
        res.json(tags);
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const show = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const tag = await prisma.tag.findUnique({
            where: { id }
        });
        res.json(tag);
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const update = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const tag = await prisma.tag.update({
            where: { id },
            data: req.body,
        });
        res.json(tag);
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const destroy = async (req, res, next) => {

    try {
        const id = parseInt(req.params.id);
        await prisma.tag.delete({
            where: { id },
        });
        res.json(`Il Tag con id ${id} è stato eliminato.`);
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