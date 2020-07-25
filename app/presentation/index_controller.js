class IndexController {
  docs = {
    schema: {
      hide: true,
    },
  };

  path = '/';

  handle = async () => {
    return {
      message: 'Pikcha!',
    };
  };
}

module.exports = {
  IndexController,
};
