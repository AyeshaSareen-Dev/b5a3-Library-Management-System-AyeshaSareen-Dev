import HttpException from "./HttpException";

export default class InternalServerException extends HttpException {
  constructor(message = "Internal Server Error") {
    super({ message, status: 500 });
    this.name = "InternalServerException";
  }
}
