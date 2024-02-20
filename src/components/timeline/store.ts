import { Prisma } from "@prisma/client";
import prisma from "../../database/connection";

class Store {
    static async insert({
        bookId,
        userId,
        pages,
    }: {
        bookId: string;
        userId: number;
        pages: number;
    }) {
        try {
            const updatedTimeLine = await prisma.timeline.create({
                data: {
                    bookId,
                    userId,
                    pages,
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

    static async update({
        id,
        userId,
        timeline,
    }: {
        id: number;
        userId: number;
        timeline: Prisma.TimelineUpdateInput;
    }) {
        try {
            await prisma.timeline.updateMany({
                where: {
                    id,
                    userId,
                },
                data: timeline,
            });
        } catch (error: any) {
            throw new Error(error);
        }
    }
}

export default Store;
