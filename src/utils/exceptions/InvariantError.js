import ClientError from "./ClientError";

class InvariantError extends ClientError {
  constructor(message) {
    super(message);
    this.name = "InvariantError";
    this.statusCode = 400;
  }
}

export default InvariantError;
