import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  it("should recive an object", async () => {
    const respond = await api.get('/event'); 
    expect(respond.status).toBe(200);
    expect(respond.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        image: expect.any(String),
        date: expect.any(String),
      }
    ));
  })
});