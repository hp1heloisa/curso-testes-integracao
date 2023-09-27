import supertest from "supertest";
import app from "../src/index";

const server = supertest(app);

describe("api", () => {
    it("servidor okay", async () => {
        const result = await server.get('/health');

        expect(result.statusCode).toBe(200);
    })
})