const BaseApi = require('./BaseApi');

function Vegetable(jsonBody) {
  this.id = jsonBody.id;
  this.name = jsonBody.name;
  if (jsonBody.origin) {this.origin = jsonBody.origin;}
  this.price = jsonBody.price;
  this.releaseDate = jsonBody.releaseDate;
}

class VegetableResource extends BaseApi {
  constructor() {
    super();
    this.path = '/vegetables';
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
    return res.body.map((vegy)=> new Vegetable(vegy));
  }
}

module.exports = VegetableResource;
