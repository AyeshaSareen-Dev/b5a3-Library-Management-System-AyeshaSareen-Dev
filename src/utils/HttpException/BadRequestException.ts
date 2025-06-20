import HttpException from "./HttpException";

export default class BadRequestException extends HttpException {
  constructor(message = "Bad Request") {
    super({ message, status: 200 });
    this.name = "BadRequestException";
  }
}
