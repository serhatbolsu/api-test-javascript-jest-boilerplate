import VegetableResource from './vegetable.resource';

class Resources {
  vegetable() {
    return new VegetableResource();
  }
}

export default new Resources();
