import resources from '../resources/resources';

describe('Vegetables - using Api Resource facade', function() {
  it('should get default', async function() {
    const vegetables = await resources.vegetable.getAll();
    expect(vegetables[0]).toHaveProperty('id');
    console.log(resources.vegetable.getUniqueVegetables());
  });

  it('should get without optional', async function() {
    const vegetables = await resources.vegetable.getAll(false);
    expect(vegetables[0]).not.toHaveProperty('origin');
  });

  it('should create vegetable', async function() {
    const res = await resources.vegetable.create(
        "Orange", 10, "2020-03-10", "UAE");
    expect(res.status).toBe(201);
    expect(res.text).toMatch(/added: Orange/);
  });

  it('should delete vegetable', async function() {
    const res = await resources.vegetable.create(
        "Orange", 10, "2020-03-10", "UAE");
    expect(res.status).toBe(201);
    const id = res.body.id;
    const res2 = await resources.vegetable.delete('/vegetables' + '/' + id);
    expect(res2.status).toBe(200);
  });
});
