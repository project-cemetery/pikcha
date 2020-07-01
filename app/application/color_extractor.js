const ColorThief = require('color-thief');
const rgbHex = require('rgb-hex');

class ColorExtrator {
  #thief = new ColorThief();

  /**
   * @param {Buffer} file
   * @returns {Promise<string>}
   */
  getColor = async (file) => {
    const colorComponents = await this.#thief.getColor(file);

    return `#${rgbHex(...colorComponents)}`;
  };
}

module.exports = {
  ColorExtrator,
};
