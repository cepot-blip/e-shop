import ClientError from "./ClientError";

class NotFoundError extends ClientError {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

export default NotFoundError;
