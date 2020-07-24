const { Cache, InMemoryProvider, RedisProvider } = require('@solid-soda/cache');
const cleanDeep = require('clean-deep');
const md5 = require('md5');

class CacheManager {
  #cache;

  constructor({ config }) {
    const redisConfig = {
      host: config.getStringOrElse('REDIS_HOST', null),
      port: config.getNumberOrElse('REDIS_PORT', null),
      password: config.getStringOrElse('REDIS_PASSWORD', null),
    };

    const useRedis = Object.values(redisConfig).some(Boolean);

    const provider = useRedis
      ? new RedisProvider(cleanDeep(redisConfig))
      : new InMemoryProvider();

    this.#cache = new Cache(provider);
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
