class AccessManager {
  #allowedHosts = [];

  constructor({ config }) {
    this.#allowedHosts = config.getStringOrElse('ALLOWED_HOSTS', '').split(',');
  }

  isValid = async ({ url }) => {
    const { host } = new URL(url);

    return this.#allowedHosts.includes(host);
  };
}

module.exports = { AccessManager };
