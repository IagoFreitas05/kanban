import request from "supertest";
import {app} from "../../../index";
import {User} from "../../../app/models/User";

jest.mock("../../../app/models/User.ts");
const mockedUser = User as jest.Mocked<typeof User>;

describe("Authentication Endpoint", () => {
  it("should authenticate a user with valid credentials", async () => {
    mockedUser.findOne.mockResolvedValueOnce({
      login: "KANBAN",
      senha: "123456",
    });

    const response = await request(app)
      .post("/login")
      .send({ login: "KANBAN", senha: "123456" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should return a 403 status when user is not found", async () => {
    mockedUser.findOne.mockResolvedValueOnce(null);

    const response = await request(app)
      .post("/login")
      .send({ login: "nonexistentuser", senha: "password" });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("error", "Incorrect password");
  });

  it("should return a 403 status with incorrect password", async () => {
    mockedUser.findOne.mockResolvedValueOnce({
      login: "testuser",
      senha: "hashed_password",
    });

    const response = await request(app)
      .post("/login")
      .send({ login: "KANBAN", senha: "incorrect_password" });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("error", "Incorrect password");
  });

});
