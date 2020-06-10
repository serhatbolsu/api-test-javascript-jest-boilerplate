import VegetableResource from './vegetable.resource';

class Resources {
  get vegetable() {
    return new VegetableResource();
  }
}

export default new Resources();
