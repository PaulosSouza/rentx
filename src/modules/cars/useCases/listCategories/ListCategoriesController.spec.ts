import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import app from "@shared/infra/http/app";
import getConnectionTypeOrm from "@shared/infra/typeorm";

let connection: Connection;

describe("List Categories Controller", () => {
  beforeAll(async () => {
    connection = await getConnectionTypeOrm();

    await connection.runMigrations();

    const id = uuid();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license)
    values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'ABS-1331')
    `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { refreshToken } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Category SuperTest",
        description: "Category SuperTest",
      })
      .set({
        Authorization: `Bearer ${refreshToken}`,
      });

    const response = await request(app)
      .get("/categories")
      .set({
        Authorization: `Bearer ${refreshToken}`,
      });

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Category SuperTest");
  });
});
