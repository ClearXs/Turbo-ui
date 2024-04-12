/**
 * turbo internal system error, refer to standard http error
 */
export type SystemError = {
  // error status code
  // 401: authentication error
  // 404: page not found
  // 500: internal error
  status: 401 | 404 | 500;
  // error message
  message: string;
  options?: ErrorOptions;
};
