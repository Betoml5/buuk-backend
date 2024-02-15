import prisma from "../../database/connection";

class Store {
    static async insert({
        userId,
        bookId,
    }: {
        userId: number;
        bookId: string;
    }) {
        try {
            const updatedLibrary = await prisma.library.create({
                data: {
                    userId,
                    bookId,
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

    static async delete({
        userId,
        bookId,
    }: {
        userId: number;
        bookId: string;
    }) {
        try {
            return await prisma.library.deleteMany({
                where: {
                    userId,
                    bookId,
                },
            });
        } catch (error) {
            throw new Error(`Error at trying to delete from library ${error}`);
        }
    }
}

export default Store;
