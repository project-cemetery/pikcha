const { version } = require('../../package.json');

const setupSwagger = (path, config) => {
  const host = config.getOrElse('EXTERNAL_HOST', 'localhost:3001');

  return {
    routePrefix: path,
    exposeRoute: true,
    swagger: {
      info: {
        title: 'Pikcha',
        description: 'Image performace optimizer',
        version,
      },
      host,
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  };
};

const defaultErrors = {
  400: {
    description: 'Invalid request',
    type: 'object',
    properties: {
      message: {
        type: 'string',
        description: 'Error message',
      },
    },
  },
  403: {
    description: 'Invalid image host',
    type: 'object',
    properties: {
      message: {
        type: 'string',
        description: 'Error message',
      },
    },
  },
};

module.exports = {
  setupSwagger,
  defaultErrors,
};
