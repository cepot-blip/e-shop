import ClientError from "./ClientError";

class AuthenticationError extends ClientError {
  constructor(message) {
    super(message, 201);
    this.name = "AuthenticationError!";
  }
}

export default AuthenticationError;
