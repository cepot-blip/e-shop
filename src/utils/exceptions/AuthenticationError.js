import ClientError from "./ClientError";

class AuthenticationError extends ClientError {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
    this.statusCode = 401;
  }
}

export default AuthenticationError;
