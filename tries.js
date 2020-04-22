// const Vegetable = require('../resources/vegetable.resource');
// const request = require('superagent');
// const baseUrl = 'http://0.0.0.0:3000';
const BaseApi = require('./resources/BaseApi');
const baseApi = new BaseApi();

async function main() {
  // const res = await request.get(baseUrl + '/vegetables');
  // const vegetables = res.body.map((vegetable) => new Vegetable(vegetable));
  // vegetables[0].getters;
  baseApi.setHeaders({ 'Content-type': 'application/json' });
  const res = await baseApi.get("/vegetables", {}, { optional: 'false' });
  console.log(res.status);
  console.log(res.body);
  // const vegetables = res.body.map((vegetable) => new Vegetable(vegetable));
  // vegetables[0].getters;

  const body = {
    "name": "Orange",
    "origin": "Turkey",
    "price": 2,
    "releaseDate": "2020-01-05",
  };
  const res2 = await baseApi.post('vegetables', body);
  console.log(res2.status);
  console.log(res2.body);

  const res3 = await baseApi.delete(`vegetables/${res2.body.id}`);
  console.log(res3.status);
  console.log(res3.body);


};

main();
