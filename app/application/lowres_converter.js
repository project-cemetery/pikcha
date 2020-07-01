const Jimp = require('jimp');

class LowresConverter {
  /**
   * @param {Buffer} file
   * @returns {Promise<Buffer>}
   */
  toLowres = async (file) => {
    const image = await Jimp.read(file);

    await image.resize(Jimp.AUTO, 10);

    const newFile = await image.getBufferAsync(Jimp.AUTO);

    return newFile;
  };
}

module.exports = {
  LowresConverter,
};
