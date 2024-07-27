import ClientError from "./ClientError";

class AuthorizationError extends ClientError {
  constructor(message) {
    super(message);
    this.name = "AuthorizationError";
    this.statusCode = 403;
  }
}
export default AuthorizationError;
