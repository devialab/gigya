export declare enum ErrorCode {
    SUCCESS = 0,
    PENDING_REGISTRATION = 206001,
    PENDING_VERIFICATION = 206002,
    UID_EXISTS = 409001,
    LOGIN_ID_EXISTS = 403043,
    VALIDATION_ERROR = 400009,
    USERNAME_EXISTS = 400003,
    INVALID_API_KEY = 400093,
    CONCURRENT_UPDATES_NOT_ALLOWED = 409030,
    NO_PERMISSION = 403007,
    RATE_LIMIT_HIT = 403048,
    GENERAL_SERVER_ERROR = 500001,
    SEARCH_TIMED_OUT = 504001,
}
export default ErrorCode;
