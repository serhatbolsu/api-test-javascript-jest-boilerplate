const VegetableResource = require('./vegetable.resource');

class Api {
  vegetable() {
    return new VegetableResource();
  }
}

module.exports = new Api();
