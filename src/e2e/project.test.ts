import { createApp } from "../utils/createApp";
import { Sequelize } from "sequelize";
import supertest from "supertest";
import dbConnection from "../config/database_config";
import env from "../env";
import * as ProjectService from "../modules/projects/project_service";
import * as UserService from "../modules/users/user_service";
import { InternalServerError } from "../errors/errors";
import log from "../utils/logger";

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

  const updateProjectInput = {
    title: "Flutter Projects",
    isFeatured: false,
    description: "This is the newest video in the video series FullStack Developer Flutter",
    price: 200.99,
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

  const updateProjectFetchPayload = {
    dataValues: {
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
    },
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

  describe("Project Update Feature", () => {
    describe("Given that project update payload and update input is valid", () => {
      it("should return a response with status code 200 with the update project model", async () => {
        const updateProjectServiceMock = jest
          .spyOn(ProjectService, "updateProject")
          //@ts-ignore
          .mockReturnValueOnce([1, projectPayload]);

        const fetchProjectServiceMock = jest
          .spyOn(ProjectService, "fetchProject")
          //@ts-ignore
          .mockReturnValueOnce(updateProjectFetchPayload);

        const checkOwnerShipMock = jest
          .spyOn(ProjectService, "checkProjectOwner")
          //@ts-ignore
          .mockReturnValueOnce(true);

        const { body, statusCode } = await supertest(app)
          .patch("/api/projects/1")
          .send(updateProjectInput);

        expect(statusCode).toBe(201);
        expect(body).toEqual(projectPayload);
        expect(checkOwnerShipMock).toHaveBeenCalledTimes(1);
        expect(fetchProjectServiceMock).toHaveBeenCalledTimes(1);
        expect(updateProjectServiceMock).toHaveBeenCalledTimes(1);
      });
    });

    describe("Given that user who is trying to update the project is not the owner", () => {
      it("should return a response with status code 400 (bad request error) and error message", async () => {
        const updateProjectServiceMock = jest
          .spyOn(ProjectService, "updateProject")
          //@ts-ignore
          .mockReturnValueOnce([1, projectPayload]);

        const fetchProjectServiceMock = jest
          .spyOn(ProjectService, "fetchProject")
          //@ts-ignore
          .mockReturnValueOnce(updateProjectFetchPayload);

        const checkOwnerShipMock = jest
          .spyOn(ProjectService, "checkProjectOwner")
          //@ts-ignore
          .mockReturnValueOnce(false);

        const { statusCode } = await supertest(app)
          .patch("/api/projects/1")
          .send(updateProjectInput);

        expect(statusCode).toBe(400);
        expect(checkOwnerShipMock).toHaveBeenCalledTimes(1);
        expect(fetchProjectServiceMock).toHaveBeenCalledTimes(1);
        expect(updateProjectServiceMock).not.toHaveBeenCalled();
      });
    });

    describe("Given that project service update project ran into some error", () => {
      it("should return a response with status code 500 (internal server error) and error message", async () => {
        const updateProjectServiceMock =
          //@ts-ignore
          jest
            .spyOn(ProjectService, "updateProject")
            .mockRejectedValueOnce(
              new InternalServerError("Something happened when trying to update project")
            );

        const checkOwnerShipMock = jest
          .spyOn(ProjectService, "checkProjectOwner")
          //@ts-ignore
          .mockReturnValueOnce(true);

        const fetchProjectServiceMock = jest
          .spyOn(ProjectService, "fetchProject")
          //@ts-ignore
          .mockReturnValueOnce(updateProjectFetchPayload);

        const { statusCode } = await supertest(app)
          .patch("/api/projects/1")
          .send(updateProjectInput);
        expect(statusCode).toBe(500);
        expect(checkOwnerShipMock).toHaveBeenCalledTimes(1);
        expect(fetchProjectServiceMock).toHaveBeenCalledTimes(1);
        expect(updateProjectServiceMock).toHaveBeenCalledTimes(1);
        expect(updateProjectServiceMock).toHaveReturned();
      });
    });
  });

  describe("Project Delete Feature", () => {
    describe("Given that project with the specific id  exists", () => {
      it("should return a response with status code 200 with project model deleted", async () => {
        //create here
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

        const checkOwnerShipMock = jest
          .spyOn(ProjectService, "checkProjectOwner")
          //@ts-ignore
          .mockReturnValueOnce(true);

        const { body, statusCode } = await supertest(app).delete(`/api/projects/${project.id}`);

        expect(statusCode).toBe(202);
        expect(checkOwnerShipMock).toHaveBeenCalledTimes(1);
        expect(body).toEqual({ msg: "Successfully deleted project" });
      });
    });

    describe("Given that project service delete project ran into some error", () => {
      it("should return a response with status code 500 (internal server error) and error message", async () => {
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

        const checkOwnerShipMock = jest
          .spyOn(ProjectService, "checkProjectOwner")
          //@ts-ignore
          .mockReturnValueOnce(true);

        const projectServiceMock = jest
          .spyOn(ProjectService, "deleteProject")
          //@ts-ignore
          .mockRejectedValue(
            new InternalServerError("Something happened when trying to create project")
          );

        const { statusCode } = await supertest(app).delete(`/api/projects/${project.id}`);
        expect(statusCode).toBe(500);
        expect(checkOwnerShipMock).toHaveBeenCalledTimes(1);
        expect(projectServiceMock).toHaveBeenCalled();
      });
    });

    describe("Given that user who is trying to delete the project is not the owner", () => {
      it("should return a response with status code 400 (bad request error) and error message", async () => {
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

        const projectServiceMock = jest
          .spyOn(ProjectService, "deleteProject")
          //@ts-ignore
          .mockRejectedValue(
            new InternalServerError("Something happened when trying to create project")
          );

        const checkOwnerShipMock = jest
          .spyOn(ProjectService, "checkProjectOwner")
          //@ts-ignore
          .mockReturnValueOnce(false);

        const { statusCode } = await supertest(app).delete(`/api/projects/${project.id}`);

        expect(statusCode).toBe(400);
        expect(checkOwnerShipMock).toHaveBeenCalledTimes(1);
        expect(projectServiceMock).not.toHaveBeenCalled();
      });
    });
  });
});
