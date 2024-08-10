import { createApp } from "../utils/createApp";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import supertest from "supertest";
import env from "../env";
import * as UserService from "../modules/users/user_service";
import { InternalServerError } from "../errors/errors";
import log from "../utils/logger";

const app = createApp();

let connection: unknown;

describe("User Module", () => {
  const createUserInput = {
    userType: "admin",
    firstName: "Ben",
    lastName: "Affleck",
    password: "kevinsander",
    passwordConfirmation: "kevinsander",
    email: "ben123@gmail.com",
  };

  const loginUserInput = {
    password: "kevinsander",
    email: "ben123@gmail.com",
  };

  const userPayload = {
    id: 1,
    userType: "test",
    firstName: "Testing Name",
    lastName: "Testing",
    email: "testing123@gmail.com",
    updatedAt: "2024-08-09T17:24:21.570Z",
    createdAt: "2024-08-09T17:24:21.570Z",
  };

  const userLoginPayload = {
    dataValues: {
      id: 1,
      userType: "test",
      firstName: "Testing Name",
      lastName: "Testing",
      email: "testing123@gmail.com",
      updatedAt: "2024-08-09T17:24:21.570Z",
      createdAt: "2024-08-09T17:24:21.570Z",
    },
  };

  beforeAll(() => {
    connection = new Sequelize(
      env.DATABASE_NAME_TEST,
      env.DATABASE_USERNAME_TEST,
      env.DATABASE_PASSWORD_TEST,
      {
        host: env.DATABASE_HOST_TEST,
        dialect: "postgres",
      }
    );

    if (!(connection instanceof Sequelize))
      fail("Connection is not an instance of Sequelize class");

    connection
      .authenticate()
      .then(() => {
        console.log("Connected to Test DB");
      })
      .catch((err) => {
        console.log(`Could not connect to Test DB with error: ${err}`);
      });
  });

  beforeEach(() => {
    //delete user table
    if (connection instanceof Sequelize) {
      //drop tables in users
      connection.query("DELETE FROM users; DELETE FROM projects;");
    }
  });

  afterAll(async () => {
    //close sequelize connection
    if (!(connection instanceof Sequelize))
      fail("Connection is not an instance of Sequelize class");
    await connection.drop();
    await connection.close();
  });

  describe("User Signup Feature", () => {
    describe("Given that user payload is valid", () => {
      it("should return a response with status code 201 with user model created", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          //@ts-ignore
          .mockReturnValueOnce(userPayload);

        const { body, statusCode } = await supertest(app).post("/api/signup").send(createUserInput);
        expect(statusCode).toBe(201);
        expect(body).toEqual(userPayload);
        expect(createUserServiceMock).toHaveBeenCalledWith(createUserInput);
        expect(createUserServiceMock).toHaveBeenCalledTimes(1);
      });
    });

    describe("Given that password and passwordConfirmation do not match", () => {
      it("should return a response with status code 400 and error message", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          //@ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode } = await supertest(app)
          .post("/api/signup")
          .send({ ...createUserInput, passwordConfirmation: "wrongpassword" });
        expect(statusCode).toBe(400);
        expect(createUserServiceMock).not.toHaveBeenCalled();
      });
    });

    describe("Given that user service ran into some error ", () => {
      it("should return a response with status code 500 (internal server error) and error message", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          //@ts-ignore
          .mockRejectedValueOnce(
            new InternalServerError("Something happened when trying to create user")
          );

        const { statusCode } = await supertest(app).post("/api/signup").send(createUserInput);
        expect(statusCode).toBe(500);
        expect(createUserServiceMock).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("User Login Feature", () => {
    describe("Given that email and password input fields are valid", () => {
      it("should return a response with status code of 200 with accessToken, refreshToken and user model associated", async () => {
        const validateUserServiceMock = jest
          .spyOn(UserService, "validatePassword")
          //@ts-ignore
          .mockReturnValueOnce(userLoginPayload);

        const { body, statusCode } = await supertest(app).post("/api/login").send(loginUserInput);

        expect(statusCode).toBe(200);
        expect(body.accessToken).not.toBeUndefined;
        expect(body.refreshToken).not.toBeUndefined;
        expect(body.user).toEqual(userLoginPayload.dataValues);
        expect(validateUserServiceMock).toHaveBeenCalledTimes(1);
      });
    });

    describe("Given that email or password input field are not valid", () => {
      it("should return a response with status code of 400 (bad request error) and error message", async () => {
        const validateUserServiceMock = jest
          .spyOn(UserService, "validatePassword")
          //@ts-ignore
          .mockReturnValueOnce(false);

        const { statusCode } = await supertest(app).post("/api/login").send(loginUserInput);

        expect(statusCode).toBe(400);
        expect(validateUserServiceMock).toHaveBeenCalledTimes(1);
      });
    });

    describe("Given that user service validate password ran into some error", () => {
      it("should return a response with status code of 500 (internal server error) and error message", async () => {
        const validateUserServiceMock = jest
          .spyOn(UserService, "validatePassword")
          //@ts-ignore
          .mockRejectedValueOnce(
            new InternalServerError("Something happened when trying to validate password")
          );

        const { statusCode } = await supertest(app).post("/api/login").send(loginUserInput);

        expect(statusCode).toBe(500);
        expect(validateUserServiceMock).toHaveBeenCalledTimes(1);
      });
    });

    describe("Given that accessToken was failed to be generated", () => {
      it("should return a response with status code of 400 (bad request error)  and error message", async () => {
        const validateUserServiceMock = jest
          .spyOn(UserService, "validatePassword")
          //@ts-ignore
          .mockReturnValueOnce(userLoginPayload);

        const accessTokenGeneratorMock = jest
          .spyOn(UserService, "generateAccessToken")
          //@ts-ignore
          .mockReturnValueOnce(null);

        const { statusCode } = await supertest(app).post("/api/login").send(loginUserInput);

        expect(validateUserServiceMock).toHaveBeenCalledTimes(1);
        expect(statusCode).toBe(400);
        expect(accessTokenGeneratorMock).toHaveBeenCalledTimes(1);
        expect(accessTokenGeneratorMock).toHaveReturnedWith(null);
      });
    });

    describe("Given that refreshToken was failed to be generated", () => {
      it("should return a response with status code of 400 (bad request error) and error message", async () => {
        const validateUserServiceMock = jest
          .spyOn(UserService, "validatePassword")
          //@ts-ignore
          .mockReturnValueOnce(userLoginPayload);

        const refreshTokenGeneratorMock = jest
          .spyOn(UserService, "generateRefreshToken")
          //@ts-ignore
          .mockReturnValueOnce(null);

        const { statusCode } = await supertest(app).post("/api/login").send(loginUserInput);

        expect(validateUserServiceMock).toHaveBeenCalledTimes(1);
        expect(statusCode).toBe(400);
        expect(refreshTokenGeneratorMock).toHaveBeenCalledTimes(1);
        expect(refreshTokenGeneratorMock).toHaveReturnedWith(null);
      });
    });
  });
});
