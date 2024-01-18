import request from "supertest";
import assert from "assert";
import app from "../../app";
import prisma from "../../database/connection";
import Store from "./store";
import { randomUUID } from "crypto";

describe("GET /user", () => {
    it("should return 200 OK", async () => {
        const response = await request(app).get("/api/v1/user");
        assert.strictEqual(response.status, 200);
    });

    it("should return 404 Not Found", async () => {
        const response = await request(app).get("/api/v1/user/0");
        assert.strictEqual(response.status, 404);
    });

    it("should return 200 OK", async () => {
        const user = await prisma.user.create({
            data: {
                email: `${randomUUID()}@hotmail.com`,
                password: "123456",
                username: "test",
            },
        });

        const response = await request(app).get(`/api/v1/user/${user.id}`);
        assert.strictEqual(response.status, 200);

        await prisma.user.delete({
            where: {
                id: user.id,
            },
        });
    });
});

describe("POST /user", () => {
    it("should return 400 Bad Request", async () => {
        const response = await request(app)
            .post("/api/v1/user")
            .send({
                user: {
                    email: `${randomUUID()}@hotmail.com`,
                    password: "123456",
                },
            });
        assert.strictEqual(response.status, 400);
    });

    it("should return 201 Created", async () => {
        const response = await request(app)
            .post("/api/v1/user")
            .send({
                user: {
                    email: `${randomUUID()}@hotmail.com`,
                    password: "123456",
                    username: "test",
                },
            });

        await Store.deleteOne({
            id: response.body.body.id,
        });
        assert.strictEqual(response.status, 201);
    });
});
