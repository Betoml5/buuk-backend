import { Prisma } from "@prisma/client";
import prisma from "../../database/connection";

class Store {
    static async get() {
        try {
            return await prisma.user.findMany({
                include: {
                    library: true,
                    readlist: true,
                    timeline: true,
                    whishlist: true,
                },
            });
        } catch (error) {
            throw new Error(`Error at trying to get users ${error}`);
        }
    }

    static async getById({ id }: { id: number; excludePassword?: boolean }) {
        try {
            return await prisma.user.findUnique({
                where: {
                    id: id,
                },
                include: {
                    library: true,
                    readlist: true,
                    timeline: true,
                    whishlist: true,
                },
            });
        } catch (error) {
            throw new Error(`Error at trying to get user ${error}`);
        }
    }

    static async insert({ user }: { user: Prisma.UserCreateInput }) {
        try {
            return await prisma.user.create({
                data: user,
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002")
                    throw new Error("User already exists");
            }
            throw new Error(`Error at trying to create user ${error}`);
        }
    }

    static async update({
        id,
        user,
    }: {
        id: number;
        user: Prisma.UserUpdateInput;
    }) {
        try {
            return await prisma.user.update({
                where: {
                    id: id,
                },
                data: user,
            });
        } catch (error) {
            throw new Error(`Error trying to update user ${error}`);
        }
    }

    static async updateMany({
        where,
        data,
    }: {
        where: Prisma.UserWhereInput;
        data: Prisma.UserUpdateInput;
    }) {
        try {
            return await prisma.user.updateMany({
                where: where,
                data: data,
            });
        } catch (error) {
            throw new Error(`Error trying to update user ${error}`);
        }
    }

    static async deleteOne({ id }: { id: number }) {
        try {
            return await prisma.user.delete({
                where: {
                    id: id,
                },
            });
        } catch (error) {
            throw new Error(`Error trying to delete user ${error}s`);
        }
    }
}

export default Store;
