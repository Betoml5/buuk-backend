import supertest from "supertest";
import assert from "assert";
import app from "../../app";
import Store from "../user/store";
import { randomUUID } from "crypto";
import bycrypt from "bcrypt";

describe("POST /auth", () => {
    it("should return 200 OK", async () => {
        const passwordEncrypyted = await bycrypt.hash("12345678", 10);
        const user = await Store.insert({
            user: {
                email: `${randomUUID()}@hotmail.com`,
                password: passwordEncrypyted,
                username: "test",
            },
        });

        const response = await supertest(app).post("/api/v1/auth/login").send({
            email: user.email,
            password: "12345678",
        });
        await Store.deleteOne({
            id: response.body.body.user.id,
        });
        assert.strictEqual(response.status, 200);
    });

    it("should return 401 Unauthorized", async () => {
        const response = await supertest(app).post("/api/v1/auth/login").send({
            email: "testbad@hotmail.com",
            password: "12345678",
        });

        assert.strictEqual(response.status, 401);
    });

    // it("should return 200 and refresh token", async () => {

    //     const response = await supertest(app).post(
    //         "/api/v1/auth/refresh-token"
    //     );

    //     assert.strictEqual(response.status, 200);
    // });
});
