// example: 'http://placekitten.com/1000/1000'

const { defaultErrors } = require('./swagger');

class ColorController {
  docs = {
    schema: {
      description: 'Get dominant color of image',
      summary: 'Color',
      querystring: {
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
            color: {
              type: 'string',
              description: 'Dominant color',
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

  path = '/api/color';

  constructor({ colorExtractor, fileDownloader, cacheManager }) {
    this.colorExtractor = colorExtractor;
    this.fileDownloader = fileDownloader;
    this.cacheManager = cacheManager;
  }

  handle = async ({ query }) => {
    const { url } = query;

    const result = await this.cacheManager.provide(
      { type: 'color', url },
      async () => {
        const file = await this.fileDownloader.getFile(url);
        const color = await this.colorExtractor.getColor(file);

        return color;
      },
    );

    return {
      color: result,
      url,
    };
  };
}

module.exports = {
  ColorController,
};
