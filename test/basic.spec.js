const request = require('superagent');
const baseUrl = 'http://0.0.0.0:3000';

describe('Vegetables', function () {
  it('should get default', async function () {
    const res = await request.get(baseUrl + '/vegetables')
    expect(res.status).toBe(200);
  });

  it('should create vegetable', async function () {
    const vegetable = {
      "name": "Orange",
      "origin": "Turkey",
      "price": 1,
      "releaseDate": "2020-01-05"
    }
    const res = await request.post(baseUrl + '/vegetables')
        .send(vegetable)
    expect(res.status).toBe(200);
    expect(res.text).toMatch(/added: Orange/);
  });

  it('should delete vegetable', async function () {
    const vegetable = {
      "name": "Orange",
      "origin": "Turkey",
      "price": 1,
      "releaseDate": "2020-01-05"
    }
    const post_result = await request.post(baseUrl + '/vegetables')
        .send(vegetable)
    expect(post_result.status).toBe(200);
    const id = post_result.body.id.toString();
    const res = await request.delete(baseUrl + '/vegetables' + '/' + id)
    expect(res.status).toBe(200);
  });
});