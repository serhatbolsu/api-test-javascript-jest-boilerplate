const BaseApi = require('./BaseApi');
let instance = null;

function Vegetable(jsonBody) {
  this.id = jsonBody.id;
  this.name = jsonBody.name;
  if (jsonBody.origin) {this.origin = jsonBody.origin;}
  this.price = jsonBody.price;
  this.releaseDate = jsonBody.releaseDate;
}

class VegetableResource extends BaseApi {
  constructor() {
    if (!instance) {
      super();
      instance = this;
      this.path = '/vegetables';
      this.vegetables = [];
    }

    return instance;
  }

  async create(name, price, releaseDate, origin) {
    const body = {
      name: name,
      price: price,
      releaseDate: releaseDate,
    };
    if (origin) {body.origin = origin;}
    return await this.post(this.path, body);
  }


  async getAll(optional=true) {
    const res = await this.get(this.path, {}, { optional: optional });
    this.vegetables = res.body.map((vegy)=> new Vegetable(vegy));
    return this.vegetables;
  }

  getUniqueVegetables() {
    return new Set(this.vegetables.map((veg)=>veg.name));
  }
}

module.exports = VegetableResource;
