import ClientError from "./ClientError";

class InvarianError extends ClientError {
  constructor(message) {
    super(message);
    this.name = "InvariantError!";
  }
}

export default InvarianError;
