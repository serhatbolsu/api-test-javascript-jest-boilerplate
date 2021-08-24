const express = require('express');
const router = express.Router();
const Vegetable = require('../models/VegetableMockDB');

router.get('/', async (req, res)=> {
  try {
    let vegetables = Vegetable.findAll();
    if (req.query.upperCase === 'true') {
      vegetables = vegetables.map((veg)=> {
        veg.name = veg.name.toUpperCase();
        return veg;
      });
    }
    if (req.query.optional === 'false') {
      vegetables = vegetables.map((veg) => {
        veg = JSON.parse(JSON.stringify(veg));
        delete veg.origin;
        return veg;
      });
    }
    console.log(req.headers);
    res.json(vegetables);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.post('/', async (req, res)=> {
  try {
    const vegetable = Vegetable.create(req.body);
    res.status(201).json({ id: vegetable.id, msg: 'Successfully added: ' + vegetable.name });
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.delete('/:id', async (req, res)=> {
  try {
    const veg = Vegetable.findByPk(parseInt(req.params.id));
    Vegetable.delete(veg);
    res.send('Successfully deleted: ' + veg.name);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

module.exports = router;
