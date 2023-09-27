import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  it("should return 200 when ask /health", async () => {
    const { status, text } = await api.get("/health");
    expect(status).toBe(200);
    expect(text).toBe("OK!");
  })
  it("should return the fibonacci sequence", async () => {
    const result = await api.get("/fibonacci?elements=5");
    expect(result.status).toBe(200);
    console.log(result)
    expect(result.text).toEqual("[0,1,1,2,3]");
    const badResult = await api.get("/fibonacci?elements=-4");
    expect(badResult.status).toBe(400);
  })
})