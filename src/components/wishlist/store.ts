import { Prisma } from "@prisma/client";
import prisma from "../../database/connection";

class Store {
    static async insert({
        bookId,
        userId,
    }: {
        bookId: string;
        userId: number;
    }) {
        try {
            return await prisma.wishlist.create({
                data: {
                    bookId,
                    userId,
                },
            });
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002")
                    throw new Error("Book already exists in wishlist");
            }
            throw new Error(`Error at trying to create wishlist ${error}`);
        }
    }

    static async getById({ userId }: { userId: number }) {
        try {
            return await prisma.wishlist.findMany({
                where: {
                    userId,
                },
            });
        } catch (error) {
            throw new Error(`Error at trying to get wishlist ${error}`);
        }
    }
}

export default Store;
