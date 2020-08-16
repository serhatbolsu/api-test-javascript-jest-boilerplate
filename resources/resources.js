import VegetableResource from './vegetable.resource';
import FlightAppResource from './flightapp.resource';

class Resources {
  get vegetable() {
    return new VegetableResource();
  }

  get flightapp() {
    return new FlightAppResource();
  }
}

export default new Resources();
