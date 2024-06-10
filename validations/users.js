const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const registerBody = {
    email: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Email è obbligatoria.',
            bail: true
        },
        isEmail: {
            errorMessage: 'Email deve essere in un formato valido',
            bail: true
        },
        custom: {
            options: async (value) => {
                const user = await prisma.user.findUnique({
                    where: { email: value }
                });
                if (user) {
                    throw new Error(`User associato a questa email esiste già.`);
                }
                return true;
            }
        }
    },
    name: {
        in: ["body"],
        isString: {
            errorMessage: 'Name deve essere una stringa.',
            bail: true
        }
    },
    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Password è obbligatoria.',
            bail: true
        },
        isString: {
            errorMessage: 'Password deve essere una stringa.',
            bail: true
        },
        isLength: {
            errorMessage: 'Password deve essere di almeno 8 caratteri',
            options: { min: 8 }
        }
    }
}

const loginBody = {
    email: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Email è obbligatoria.',
            bail: true
        },
        isEmail: {
            errorMessage: 'Email deve essere in un formato valido',
        }
    },
    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Password è obbligatoria.',
            bail: true
        },
        isString: {
            errorMessage: 'Password deve essere una stringa.',
        }
    }
}

module.exports = {
    registerBody,
    loginBody
}