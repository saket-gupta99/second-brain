export class ApiError extends Error {
  public success: boolean;
  public data: null;
  constructor(
    public statusCode: number,
    public message = "Something went wrong",
    public errors: string[] = []
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.success = false;
    this.data = null;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}
