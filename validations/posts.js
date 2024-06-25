const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bodyData = {
    title: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Il Titolo è un campo obbligatorio.',
            bail: true
        },
        isString: {
            errorMessage: 'Il Titolo deve essere una stringa',
            bail: true
        },
        trim: true,
    },
    slug: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Lo Slug è un campo obbligatorio.',
            bail: true
        }
    },
    published: {
        in: ["body"],
        toBoolean: true,
        isBoolean: {
            errorMessage: 'Published deve essere un booleano.'
        },
    },
    categoryId: {
        in: ["body"],
        toInt: true,
        isInt: {
            errorMessage: "Category Id deve essere numero intero",
            bail: true
        },
        custom: {
            options: async (value) => {
                const categoryId = parseInt(value);
                const category = await prisma.category.findUnique({
                    where: { id: categoryId }
                });
                if (!category) {
                    throw new Error(`Non esiste una Category con id ${categoryId}`);
                }
                return true;
            }
        },
    },
    tags: {
        in: ["body"],
        isInt: {
            errorMessage: "Tags deve essere numero intero",
            bail: true
        },
        isArray: {
            errorMessage: "Tags deve essere un array",
            bail: true
        },
        customSanitizer: { options: value => value.map(tag => parseInt(tag)) },
        custom: {
            options: async (ids) => {
                const tags = await prisma.tag.findMany({
                    where: { id: { in: ids } }
                });
                if (tags.length !== ids.length) {
                    throw new Error(`Uno o più Tags non esistono.`);
                }
                return true;
            }
        }
    }
}


module.exports = {
    bodyData,
}