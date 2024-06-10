const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

const store = async (req, res, next) => {

    const { title, slug, image, content, published, categoryId, tags } = req.body;

    const data = {
        title,
        slug,
        image,
        content,
        published,
        categoryId,
        tags: {
            connect: tags.map(tag => ({ id: tag }))
        }
    }

    try {
        const post = await prisma.post.create({ data });
        res.status(200).send(post);
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const index = async (req, res, next) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                category: {
                    select: {
                        name: true,
                    }
                },
                tags: {
                    select: {
                        name: true,
                    }
                }
            }
        });
        res.json(posts);
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const show = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const post = await prisma.post.findUnique({
            where: { slug },
            include: {
                category: {
                    select: {
                        name: true,
                    }
                },
                tags: {
                    select: {
                        name: true,
                    }
                }
            }
        });
        if (post) {
            post.category = post.category.name;
            post.tags = post.tags.map(tag => tag.name);
            res.json(post);
        }
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const update = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const { title, image, content, published, categoryId, tags } = req.body;
        const data = {
            title,
            image,
            content,
            published,
            categoryId,
            tags: {
                set: tags.map(id => ({ id }))
            }
        }
        const post = await prisma.post.update({ where: { slug }, data });
        res.json(post);
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { slug } = req.params;
        await prisma.post.delete({ where: { slug } });
        res.json(`Il post ${slug} è stato eliminato.`);
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