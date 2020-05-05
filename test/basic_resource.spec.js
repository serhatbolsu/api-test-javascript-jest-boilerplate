const BaseApi = require('../resources/BaseApi');
const api = new BaseApi();

describe('Vegetables - using baseApi', function() {
  it('should get default', async function() {
    const res = await api.get('/vegetables');
    expect(res.status).toBe(200);
  });

  it('should get without optional', async function() {
    const res = await api.get('vegetables', {},
        { optional: 'false' });
    expect(Object.keys(res.body[0])).not.toContain('origin');
  });

  it('should create vegetable', async function() {
    const vegetable = {
      "name": "Orange",
      "origin": "Turkey",
      "price": 1,
      "releaseDate": "2020-01-05",
    };
    const res = await api.post('/vegetables', vegetable);
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
    const postResult = await api.post('/vegetables', vegetable);
    expect(postResult.status).toBe(201);
    const id = postResult.body.id.toString();
    const res = await api.delete('/vegetables' + '/' + id);
    expect(res.status).toBe(200);
  });
});
