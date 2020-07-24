const awilix = require('awilix');

const { ColorController } = require('./presentation/color_controller');
const { LowresController } = require('./presentation/lowres_controller');
const { AccessGuard } = require('./presentation/access_guard');
const { ValidationGuard } = require('./presentation/validation_guard');
const { AccessManager } = require('./application/access_manager');
const { CacheManager } = require('./application/cache_manager');
const { ColorExtrator } = require('./application/color_extractor');
const { LowresConverter } = require('./application/lowres_converter');
const { FileDownloader } = require('./application/file_downloader');
const { getConfig } = require('./infrastructure/config');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  // http
  colorController: awilix.asClass(ColorController),
  lowresController: awilix.asClass(LowresController),
  accessGuard: awilix.asClass(AccessGuard),
  validationGuard: awilix.asClass(ValidationGuard),
  // app
  accessManager: awilix.asClass(AccessManager),
  cacheManager: awilix.asClass(CacheManager),
  colorExtractor: awilix.asClass(ColorExtrator),
  lowresConverter: awilix.asClass(LowresConverter),
  fileDownloader: awilix.asClass(FileDownloader),
  // utility
  config: awilix.asFunction(getConfig),
});

module.exports = {
  container,
};
