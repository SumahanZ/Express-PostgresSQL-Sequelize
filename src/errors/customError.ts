export abstract class CustomError extends Error {
  constructor(message: string, readonly statusCode: number) {
    super(message);
  }
}
