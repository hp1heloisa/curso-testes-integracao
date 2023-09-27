import supertest from "supertest";

import app from "./../src/app";
import prisma from "../src/database";

const api = supertest(app);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /users tests", () => {
  it("should create a user", async () => {
    const respond = await api.post('/users').send({
      email: "heloisa@driven.com",
      password: "123456"
    });
    expect(respond.status).toBe(201);

  });

  it("should receive 409 when trying to create two users with same e-mail", async () => {
    const respond = await api.post('/users').send({
      email: "heloisa@driven.com",
      password: "123456"
    });
    expect(respond.status).toBe(201);
    const respond2 = await api.post('/users').send({
      email: "heloisa@driven.com",
      password: "123456"
    });
    expect(respond2.status).toBe(409);
  });

});

describe("GET /users tests", () => {
  it("should return a single user", async () => {
    const respond = await prisma.user.create({
      data:{
        email: "heloisa@driven.com",
        password: "123456"
      }
    });
    const {status, body} = await api.get(`/users/${respond.id}`);
    expect(status).toBe(200);
    expect(body).toEqual({
      id: respond.id,
      email: 'heloisa@driven.com',
      password: "123456"
    });
  });

  it("should return 404 when can't find a user by id", async () => {
    const respond = await prisma.user.create({
      data:{
        email: "heloisa@driven.com",
        password: "123456"
      }
    });
    const {status} = await api.get(`/users/${respond.id+10}`);
    expect(status).toBe(404);
  });

  it("should return all users", async () => {
    await api.post('/users').send({
      email: "heloisa@driven.com",
      password: "123456"
    });
    await api.post('/users').send({
      email: "heloisa10@driven.com",
      password: "123456"
    });
    const respond3 = await api.get('/users');
    expect(respond3.status).toBe(200);
    expect(respond3.body).toHaveLength(2);
  });

})