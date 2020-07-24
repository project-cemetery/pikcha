/* eslint-disable max-classes-per-file */

class EmptyUrlError extends Error {
  statusCode = 400;

  constructor() {
    super(`Empty url does not allowed`);
  }
}

class InvalidUrlError extends Error {
  statusCode = 400;

  constructor(url) {
    super(`Url "${url}" is invalid`);
  }
}

module.exports = {
  EmptyUrlError, InvalidUrlError
};
