import prisma from "../../database/connection";

class Store {
    static async insert({
        bookISBN,
        userId,
    }: {
        bookISBN: string;
        userId: number;
    }) {
        try {
            const wishlist = await prisma.wishlist.create({
                data: {
                    bookISBN,
                    userId,
                },
            });
            return wishlist;
        } catch (error) {
            throw error;
        }
    }

    static async getById({ userId }: { userId: number }) {
        try {
            const wishlist = await prisma.wishlist.findMany({
                where: {
                    userId,
                },
            });
            return wishlist;
        } catch (error) {
            throw error;
        }
    }
}

export default Store;
