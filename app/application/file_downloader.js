const fetch = require('node-fetch');

class FileDownloader {
  /**
   * @param {string} url
   * @returns {Promise<Buffer>}
   */
  getFile = async (url) => {
    const response = await fetch(url);

    return response.buffer();
  };
}

module.exports = { FileDownloader };
