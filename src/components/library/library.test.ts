import supertest from "supertest";
import assert from "assert";
import app from "../../app";

describe("GET /library", () => {
    it("should return 200 OK", async () => {
        const response = await supertest(app).get("/api/v1/library/1");
        assert.strictEqual(response.status, 200);
    });

    // it("should return 404 Not Found", async () => {
    //     const response = await supertest(app).get("/api/v1/library/0");
    //     assert.strictEqual(response.status, 404);
    // });

    it("should return 201 OK", async () => {
        const response = await supertest(app).post("/api/v1/library").send({
            bookISBN: "1234",
        });

        assert.strictEqual(response.status, 201);
    });
});
