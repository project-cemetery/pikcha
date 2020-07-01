const { CommonConfiguration } = require('@solid-soda/config');
const path = require('path');

const getConfig = () =>
  new CommonConfiguration(path.resolve(__dirname, '../../.env'));

module.exports = {
  getConfig,
};
