const request = require('superagent');
const baseUrl = global.baseUrl;

describe('Vegetables baseline without framework', function() {
  it('should get default', async function() {
    const res = await request.get(baseUrl + '/vegetables');
    expect(res.status).toBe(200);
  });

  it('should create vegetable', async function() {
    const vegetable = {
      "name": "Orange",
      "origin": "Turkey",
      "price": 1,
      "releaseDate": "2020-01-05",
    };
    const res = await request.post(baseUrl + '/vegetables')
        .send(vegetable);
    expect(res.status).toBe(201);
    expect(res.text).toMatch(/added: Orange/);
  });

  it('should delete vegetable', async function() {
    const vegetable = {
      "name": "Orange",
      "origin": "Turkey",
      "price": 1,
      "releaseDate": "2020-01-05",
    };
    const postResult = await request.post(baseUrl + '/vegetables')
        .send(vegetable);
    expect(postResult.status).toBe(201);
    const id = postResult.body.id.toString();
    const res = await request.delete(baseUrl + '/vegetables' + '/' + id);
    expect(res.status).toBe(200);
  });
});
