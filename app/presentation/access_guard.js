const { UnallowedUrlError } = require('./access_error');

class AccessGuard {
  constructor({ accessManager }) {
    this.accessManager = accessManager;
  }

  get hooks() {
    return [{ hook: 'onRequest', handle: this.onRequest }];
  }

  onRequest = async ({ query, ...rest }) => {
    // Apply this guard only for api endpoints
    if (!rest.raw.url.includes('/api')) {
      return;
    }

    const valid = await this.accessManager.isValid(query);

    if (!valid) {
      throw new UnallowedUrlError(query.url);
    }
  };
}

module.exports = {
  AccessGuard,
};
