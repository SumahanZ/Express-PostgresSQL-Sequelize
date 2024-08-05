import { CustomError } from "./customError";

export class BadRequestError extends CustomError {
  constructor(message?: string) {
    super(message || "Bad request", 400);
  }
}

export class InternalServerError extends CustomError {
  constructor(message?: string) {
    super(message || "Internal Server Error", 500);
  }
}

export class NotFoundError extends CustomError {
  constructor(message?: string) {
    super(message || "Not Found", 404);
  }
}
