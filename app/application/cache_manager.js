const { Cache, InMemoryProvider, RedisProvider } = require('@solid-soda/cache');
const md5 = require('md5');

class CacheManager {
  #cache;

  constructor({ config }) {
    // TODO: if in config we found redix config, replace InMemotyProvider with RedisProvider
    this.#cache = new Cache(new InMemoryProvider());
  }

  provide = async (params, calculate) => {
    const key = this.#getKey(params);

    const [cachedValue, setCachedValue] = await this.#cache.useCache(key);

    if (cachedValue) {
      return cachedValue;
    }

    const newValue = await calculate();

    await setCachedValue(newValue);

    return newValue;
  };

  #getKey = ({ type, url }) => {
    const urlHash = md5(url);

    return `${type}-${urlHash}`;
  };
}

module.exports = {
  CacheManager,
};
