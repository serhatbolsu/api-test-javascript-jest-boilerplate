class VegetableResource {
  constructor({ name, price, releaseDate, origin }) {
    this.name = name;
    this.price = price;
    if ( origin !== undefined) this.origin = origin;
    this.releaseDate = releaseDate;
  }
}

module.exports = VegetableResource;
