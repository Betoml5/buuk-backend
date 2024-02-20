import { PrismaClient } from "@prisma/client";

// Usa el cliente de Prisma para realizar operaciones en la base de datos

const prisma = new PrismaClient({
    datasources: {
        db: {
            url:
                process.env.NODE_ENV === "development"
                    ? process.env.DATABASE_URL
                    : process.env.DATABASE_URL_TEST,
        },
    },
});

export default prisma;
