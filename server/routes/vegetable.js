const express = require('express');
const router = express.Router();
const db = require('../models/Vegetable');
const { Vegetable, Sequelize, sequelize } = db;

router.get('/', async (req, res)=> {
  try {
    let vegetables = await Vegetable.findAll();
    if (req.query.upperCase === 'true') {
      vegetables = vegetables.map((veg)=> {
        veg.name = veg.name.toUpperCase();
        return veg;
      });
    }
    if (req.query.optional === 'false') {
      vegetables = vegetables.map((veg) => {
        veg = veg.toJSON();
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
    const vegetable = await Vegetable.create(req.body);
    res.status(201).json({ id: vegetable.id, msg: 'Successfully added: ' + vegetable.name });
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.delete('/:id', async (req, res)=> {
  try {
    const veg = await Vegetable.findByPk(parseInt(req.params.id));
    await veg.destroy();
    res.send('Successfully deleted: ' + veg.name);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

module.exports = router;
