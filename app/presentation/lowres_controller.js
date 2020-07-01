// example: 'http://placekitten.com/1000/1000'

const { defaultErrors } = require('./swagger');

class LowresController {
  docs = {
    schema: {
      description: 'Get low resolution version of image in base64',
      summary: 'Lowres',
      query: {
        url: {
          type: 'string',
          description: "Image's URL",
        },
      },
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            lowres: {
              type: 'string',
              description: 'Base64-encoded low resolution image',
            },
            url: {
              type: 'string',
              description: "Original image's URL",
            },
          },
        },
        ...defaultErrors,
      },
    },
  };

  path = '/api/lowres';

  constructor({ fileDownloader, lowresConverter, cacheManager }) {
    this.fileDownloader = fileDownloader;
    this.lowresConverter = lowresConverter;
    this.cacheManager = cacheManager;
  }

  handle = async ({ query }) => {
    const { url } = query;

    const result = await this.cacheManager.provide(
      { type: 'lowres', url },
      async () => {
        const file = await this.fileDownloader.getFile(url);
        const lowresFile = await this.lowresConverter.toLowres(file);

        return lowresFile.toString('base64');
      },
    );

    return {
      lowres: result,
      url,
    };
  };
}

module.exports = {
  LowresController,
};
