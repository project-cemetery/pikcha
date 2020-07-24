const { EmptyUrlError, InvalidUrlError } = require('./validation_error');

class ValidationGuard {
  get hooks() {
    return [{ hook: 'onRequest', handle: this.onRequest }];
  }

  onRequest = async ({ query, ...rest }) => {
    // Apply this guard only for api endpoints
    if (!rest.raw.url.includes('/api')) {
      return;
    }

    const valid = Boolean(query.url);

    if (!valid) {
      throw new EmptyUrlError();
    }

    try {
      // eslint-disable-next-line no-unused-vars
      const _ = new URL(query.url)
    } catch (error) {
      throw new InvalidUrlError(query.url)
    }
  };
}

module.exports = {
  ValidationGuard,
};
