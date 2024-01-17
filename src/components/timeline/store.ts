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
            const updatedTimeLine = await prisma.timeline.create({
                data: {
                    bookISBN,
                    userId,
                },
            });
            return updatedTimeLine;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async getById({ userId }: { userId: number }) {
        try {
            const timeline = await prisma.timeline.findMany({
                where: {
                    userId,
                },
            });
            return timeline;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}

export default Store;
