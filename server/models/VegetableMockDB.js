class Vegetable {
  constructor(id, name, origin, price, date) {
    this.id = id;
    this.name = name;
    this.origin = origin;
    this.price = price;
    this.date = date;
  }
}


class VegetableMockDB {
  #idIdx = 0
  #bucket = []

  create(obj) {
    const veggy = new Vegetable(
        this.#idIdx,
        obj.name,
        obj.origin,
        obj.price,
        obj.releaseDate,
    );
    this.#bucket.push(veggy);
    this.#idIdx +=1;
    return veggy;
  }

  findAll() {
    return this.#bucket;
  }

  findByPk(id) {
    return this.#bucket.filter((elem) => {return elem.id === id;})[0];
  }

  delete(veggy) {
    this.#bucket = this.#bucket.filter( (elem) => {return elem.id !== veggy.id;});
  }
}

const VegetableDB = new VegetableMockDB();

VegetableDB.create({
  name: "Melon",
  origin: "Turkey",
  price: 10,
  releaseDate: new Date(2020, 1, 20),
});


module.exports = VegetableDB;
