import HttpException from "./HttpException";

export class UnprocessableEntityException extends HttpException {
  constructor(message = "Unprocessable Entity") {
    super({ message, status: 422 });
    this.name = "UnprocessableEntityException";
  }
}
