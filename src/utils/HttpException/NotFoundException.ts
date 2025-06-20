import HttpException from "./HttpException";

export default class NotFoundException extends HttpException {
  constructor(message = "Not Found") {
    super({ message, status: 404 });
    this.name = "NotFoundException";
  }
}
