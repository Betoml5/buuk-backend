import prisma from "../../database/connection";

class Store {
    static async insert({
        userId,
        bookISBN,
    }: {
        userId: number;
        bookISBN: string;
    }) {
        try {
            const updatedLibrary = await prisma.library.create({
                data: {
                    userId,
                    bookISBN,
                },
            });
            return updatedLibrary;
        } catch (error) {
            throw new Error(`Error at trying to insert into library ${error}`);
        }
    }

    static async getById({ userId }: { userId: number }) {
        try {
            return await prisma.library.findMany({
                where: {
                    userId,
                },
            });
        } catch (error) {
            throw new Error(`Error at trying to get from library ${error}`);
        }
    }
}

export default Store;