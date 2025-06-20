export default abstract class HttpException extends Error {
  private status: number;
  constructor({ status, message }: { status: number; message: string }) {
    super(message);
    this.status = status;
  }
  toJSON() {
    return {
      success: false,
      statusCode: this.status,
      message: this.message,
    };
  }
}
