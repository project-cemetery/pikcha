class UnallowedUrlError extends Error {
  statusCode = 403;

  constructor(url) {
    super(`Url ${url} do not allowed`);
  }
}

module.exports = {
  UnallowedUrlError,
};
