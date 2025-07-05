import { ZodError } from "zod";
import { HttpException, InternalServerException } from "./HttpException";

interface IMetadata {
  total: number;
  pageCount: number;
}

export class ResponseBuilder<T = Record<string, unknown>> {
  private message: string = "";
  private success: boolean;
  private statusCode: number = 200;
  private data: T | null | undefined;
  private metadata: IMetadata | null | undefined;
  private error:
    | ({
        message?: string;
        success: boolean;
        statusCode: number;
      } & Partial<ZodError>)
    | null
    | undefined;
  constructor(success: boolean, statusCode?: number) {
    this.success = success;
    if (statusCode) {
      this.statusCode = statusCode;
    }
  }

  // Add a message to the response object
  withMessage(message: string) {
    this.message = message;
    return this;
  }

  //   Add data to the response object
  withData(data: T) {
    this.data = data;
    return this;
  }

  // Add metadata to the response object
  withMetadata(metadata: IMetadata) {
    this.metadata = metadata;
    return this;
  }

  //   Add error and status to the response object
  withError(error: HttpException | ZodError | Error | unknown) {
    if (error instanceof HttpException) {
      this.error = error.toJSON();
      this.message = error.message;
      this.statusCode = error.toJSON().statusCode;
    } else if (error instanceof ZodError) {
      this.error = {
        statusCode: 400,
        success: false,
        ...error,
      };
      this.message = "Validation Error!";
      this.statusCode = 400;
    } else if (error instanceof Error) {
      this.error = {
        message: error.message,
        success: false,
        statusCode: 500,
      };
      this.statusCode = 500;
      this.message = error.message;
    } else {
      this.error = new InternalServerException().toJSON();
      this.message = "Internal Server Error";
      this.statusCode = 500;
    }

    return this;
  }

  // Build the response object
  build() {
    return {
      success: this.success,
      statusCode: this.statusCode,
      message: this.message,
      metadata: this.metadata,
      data: this.data,
      error: this.error,
    };
  }

  static format(json: Record<string, unknown>) {
    return {
      success: json.success,
      message: json.message,
      metadata: json.metadata,
      data: json.data,
      error: json.error,
    };
  }

  public static success<T>(statusCode?: number) {
    return new ResponseBuilder<T>(true, statusCode);
  }

  public static error() {
    return new ResponseBuilder<undefined>(false);
  }
}
