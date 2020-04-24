const VegetableResource = require('./vegetable.resource');

class Api {
  constructor() {
    this.resources = {};
  }

  vegetable() {
    return this.resources.vegetable = this.resources.vegetable || new VegetableResource();
  }
}

module.exports = new Api();
