import supertest from "supertest";
import app from "../../app";
import assert from "assert";
import Store from "./store";

describe("Wishlist", () => {
    it("should return 200", async () => {
        await Store.insert({
            bookISBN: "test",
            userId: 4,
        });
        const response = await supertest(app).get("/api/v1/wishlist/1");
        assert.strictEqual(response.status, 200);
    });
});

describe("/POST wishlist", () => {
    it("should return 201", async () => {
        const response = await supertest(app).post("/api/v1/wishlist").send({
            bookISBN: "test",
        });
        assert.strictEqual(response.status, 201);
    });
});
