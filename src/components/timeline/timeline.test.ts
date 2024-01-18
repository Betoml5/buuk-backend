import supertest from "supertest";
import assert from "assert";
import app from "../../app";
// import Store from "../user/store";
// import { randomUUID } from "crypto";

describe("GET /timeline", () => {
    it("should return 200 OK", async () => {
        const response = await supertest(app).get("/api/v1/timeline/1");
        assert.strictEqual(response.status, 200);
    });
});

describe("POST /timeline", () => {
    it("should return 201 Created", async () => {
        const response = await supertest(app).post("/api/v1/timeline").send({
            bookISBN: "1234",
        });
        // console.log("RESPONSE!", response);
        assert.strictEqual(response.status, 201);
    });
});
