/**
 * Custom API Error class for consistent error handling
 */
export class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Create a Bad Request error (400)
   */
  static badRequest(message: string = 'Bad Request'): ApiError {
    return new ApiError(400, message);
  }

  /**
   * Create an Unauthorized error (401)
   */
  static unauthorized(message: string = 'Unauthorized'): ApiError {
    return new ApiError(401, message);
  }

  /**
   * Create a Forbidden error (403)
   */
  static forbidden(message: string = 'Forbidden'): ApiError {
    return new ApiError(403, message);
  }

  /**
   * Create a Not Found error (404)
   */
  static notFound(message: string = 'Not Found'): ApiError {
    return new ApiError(404, message);
  }

  /**
   * Create a Conflict error (409)
   */
  static conflict(message: string = 'Conflict'): ApiError {
    return new ApiError(409, message);
  }

  /**
   * Create an Unprocessable Entity error (422)
   */
  static unprocessableEntity(message: string = 'Unprocessable Entity'): ApiError {
    return new ApiError(422, message);
  }

  /**
   * Create an Internal Server Error (500)
   */
  static internal(message: string = 'Internal Server Error'): ApiError {
    return new ApiError(500, message, false);
  }

  /**
   * Create a Service Unavailable error (503)
   */
  static serviceUnavailable(message: string = 'Service Unavailable'): ApiError {
    return new ApiError(503, message);
  }
}

export default ApiError;
