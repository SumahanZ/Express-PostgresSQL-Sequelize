import { createApp } from "../utils/createApp";
import { Sequelize } from "sequelize";
import supertest from "supertest";
import dbConnection from "../config/database_config";
import env from "../env";
import * as ProjectService from "../modules/projects/project_service";
import * as UserService from "../modules/users/user_service";
import { InternalServerError } from "../errors/errors";

const app = createApp();

describe("Project Module", () => {
  const createProjectInput = {
    title: "Laravel Web FullStack Project",
    isFeatured: true,
    description: "This is the newest video in the video series FullStack Developer Laravel PHP",
    price: 168.99,
    shortDescription: "New Laravel Video",
    ownerId: 1,
    productUrl: "http://newestlaravelvideo.com",
    category: ["web-development", "laravel-developer", "php-developer"],
    tags: ["new", "laravel", "php"],
  };

  const projectListPayload = [
    {
      id: expect.any(Number),
      title: "Laravel Web FullStack Project",
      isFeatured: true,
      description: "This is the newest video in the video series FullStack Developer Laravel PHP",
      price: expect.any(String),
      shortDescription: "New Laravel Video",
      ownerId: expect.any(Number),
      productUrl: "http://newestlaravelvideo.com",
      category: ["web-development", "laravel-developer", "php-developer"],
      tags: ["new", "laravel", "php"],
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
    },
  ];

  const projectPayload = {
    id: 1,
    title: "Laravel Web FullStack Project",
    isFeatured: true,
    description: "This is the newest video in the video series FullStack Developer Laravel PHP",
    price: "168.99",
    shortDescription: "New Laravel Video",
    ownerId: 1,
    productUrl: "http://newestlaravelvideo.com",
    category: ["web-development", "laravel-developer", "php-developer"],
    tags: ["new", "laravel", "php"],
    updatedAt: "2024-08-12T08:42:57.513Z",
    createdAt: "2024-08-12T08:42:57.513Z",
  };

  beforeAll(() => {
    dbConnection.connect({
      name: env.DATABASE_NAME_TEST,
      username: env.DATABASE_USERNAME_TEST,
      password: env.DATABASE_PASSWORD_TEST,
      host: env.DATABASE_HOST_TEST,
    });

    if (!(dbConnection.connection instanceof Sequelize))
      fail("Connection is not an instance of Sequelize class");

    dbConnection.connection
      .authenticate()
      .then(() => {
        console.log("Connected to Test DB");
      })
      .catch((err) => {
        console.log(`Could not connect to Test DB with error: ${err}`);
      });
  });

  beforeEach(async () => {
    //delete user table
    if (dbConnection.connection instanceof Sequelize) {
      //drop tables in users
      await dbConnection.connection.query("DELETE FROM projects;");
      await dbConnection.connection.query("DELETE FROM users;");
    }
  });

  afterAll(async () => {
    //close sequelize connection
    if (!(dbConnection.connection instanceof Sequelize))
      fail("Connection is not an instance of Sequelize class");
    await dbConnection.connection.query("DELETE FROM projects;");
    await dbConnection.connection.query("DELETE FROM users;");
    // await dbConnection.drop();
    await dbConnection.close();
  });

  describe("Project Create Feature", () => {
    describe("Given that project creation payload and creation input is valid", () => {
      it("should return a response with status code 201 with project model created", async () => {
        const projectServiceMock = jest
          .spyOn(ProjectService, "createProject")
          //@ts-ignore
          .mockReturnValueOnce(projectPayload);

        const { body, statusCode } = await supertest(app)
          .post("/api/projects")
          .send(createProjectInput);

        expect(statusCode).toBe(201);
        expect(body).toEqual(projectPayload);
        expect(projectServiceMock).toHaveBeenCalledWith(createProjectInput);
        expect(projectServiceMock).toHaveBeenCalledTimes(1);
      });
    });

    describe("Given that project service create project ran into some error", () => {
      it("should return a response with status code 500 (internal server error) and error message", async () => {
        const projectServiceMock = jest
          .spyOn(ProjectService, "createProject")
          //@ts-ignore
          .mockRejectedValue(
            new InternalServerError("Something happened when trying to create project")
          );

        const { statusCode } = await supertest(app).post("/api/projects");
        expect(statusCode).toBe(500);
        expect(projectServiceMock).toHaveBeenCalledTimes(1);
      });
    });

    describe("Given that project service create project return null", () => {
      it("should return a response with status code 400 (bad request error) with error message", async () => {
        const projectServiceMock = jest
          .spyOn(ProjectService, "createProject")
          //@ts-ignore
          .mockReturnValue(null);

        const { statusCode } = await supertest(app).post("/api/projects");
        expect(statusCode).toBe(404);
        expect(projectServiceMock).toHaveBeenCalledTimes(1);
        expect(projectServiceMock).toHaveReturnedWith(null);
      });
    });
  });

  describe("Project Fetch Feature", () => {
    describe("Given that project with the specific id passed from parameter exists", () => {
      it("should return a response with status code 200 with list of project model fetched", async () => {
        const user = await UserService.createUser({
          userType: "admin",
          firstName: "Wonder",
          lastName: "Woman",
          password: "kevinsander",
          email: "wonderwoman@gmail.com",
        });

        const project = await ProjectService.createProject({
          ...createProjectInput,
          ownerId: user.id,
        });

        const { body, statusCode } = await supertest(app).get(`/users/${user.id}/projects`);

        expect(statusCode).toBe(200);
        expect(body[0].id).toEqual(project.id);
        expect(body).toEqual(projectListPayload);
      });
    });

    describe("Given that project service fetch project ran into some error", () => {
      it("should return a response with status code 500 (internal server error) and error message", async () => {
        const projectServiceMock = jest
          .spyOn(ProjectService, "fetchProjects")
          //@ts-ignore
          .mockRejectedValue(
            new InternalServerError("Something happened when trying to create project")
          );

        const { statusCode } = await supertest(app).get(`/users/1/projects`);
        expect(statusCode).toBe(500);
        expect(projectServiceMock).toHaveBeenCalledTimes(1);
      });
    });
  });

  // describe("Project Update Feature", () => {
  //   describe("Given that project with the specific id passed from parameter exists", () => {
  //     it("should return a response with status code 200 with list of project model fetched", async () => {
  //       const projectServiceMock = jest
  //         .spyOn(ProjectService, "fetchProjects")
  //         //@ts-ignore
  //         .mockReturnValueOnce(projectPayload);

  //       const { body, statusCode } = await supertest(app)
  //         .post("/api/projects/1")
  //         .send(createProjectInput);
  //       expect(statusCode).toBe(201);
  //       expect(body).toEqual(projectPayload);
  //       expect(projectServiceMock).toHaveBeenCalledWith(createProjectInput);
  //       expect(projectServiceMock).toHaveBeenCalledTimes(1);
  //     });
  //   });

  //   describe("Given that project service fetch project ran into some error", () => {
  //     it("should return a response with status code 500 (internal server error) and error message", async () => {
  //       const projectServiceMock = jest
  //         .spyOn(ProjectService, "fetchProjects")
  //         //@ts-ignore
  //         .mockRejectedValue(
  //           new InternalServerError("Something happened when trying to create project")
  //         );

  //       const { statusCode } = await supertest(app).post("/api/projects");
  //       expect(statusCode).toBe(500);
  //       expect(projectServiceMock).toHaveBeenCalledTimes(1);
  //       expect(projectServiceMock).toHaveReturnedWith(null);
  //     });
  //   });

  //   describe("Given that project service fetch project return null", () => {
  //     it("should return a response with status code 400 (bad request error) with error message", async () => {
  //       const projectServiceMock = jest
  //         .spyOn(ProjectService, "fetchProjects")
  //         //@ts-ignore
  //         .mockReturnValue(null);

  //       const { statusCode } = await supertest(app).post("/api/projects");
  //       expect(statusCode).toBe(400);
  //       expect(projectServiceMock).toHaveBeenCalledTimes(1);
  //       expect(projectServiceMock).toHaveReturnedWith(null);
  //     });
  //   });
  // });

  // describe("Project Delete Feature", () => {
  //   describe("Given that project with the specific id passed from parameter exists", () => {
  //     it("should return a response with status code 200 with list of project model fetched", async () => {
  //       const projectServiceMock = jest
  //         .spyOn(ProjectService, "fetchProjects")
  //         //@ts-ignore
  //         .mockReturnValueOnce(projectPayload);

  //       const { body, statusCode } = await supertest(app)
  //         .post("/api/projects/1")
  //         .send(createProjectInput);
  //       expect(statusCode).toBe(201);
  //       expect(body).toEqual(projectPayload);
  //       expect(projectServiceMock).toHaveBeenCalledWith(createProjectInput);
  //       expect(projectServiceMock).toHaveBeenCalledTimes(1);
  //     });
  //   });

  //   describe("Given that project service fetch project ran into some error", () => {
  //     it("should return a response with status code 500 (internal server error) and error message", async () => {
  //       const projectServiceMock = jest
  //         .spyOn(ProjectService, "fetchProjects")
  //         //@ts-ignore
  //         .mockRejectedValue(
  //           new InternalServerError("Something happened when trying to create project")
  //         );

  //       const { statusCode } = await supertest(app).post("/api/projects");
  //       expect(statusCode).toBe(500);
  //       expect(projectServiceMock).toHaveBeenCalledTimes(1);
  //       expect(projectServiceMock).toHaveReturnedWith(null);
  //     });
  //   });

  //   describe("Given that project service fetch project return null", () => {
  //     it("should return a response with status code 400 (bad request error) with error message", async () => {
  //       const projectServiceMock = jest
  //         .spyOn(ProjectService, "fetchProjects")
  //         //@ts-ignore
  //         .mockReturnValue(null);

  //       const { statusCode } = await supertest(app).post("/api/projects");
  //       expect(statusCode).toBe(400);
  //       expect(projectServiceMock).toHaveBeenCalledTimes(1);
  //       expect(projectServiceMock).toHaveReturnedWith(null);
  //     });
  //   });
  // });
});
