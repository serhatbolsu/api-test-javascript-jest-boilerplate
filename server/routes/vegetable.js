const express = require('express');
const router = express.Router();
const db = require('../models/Vegetable');
const { Vegetable, Sequelize, sequelize } = db;

router.get('/', async (req,res)=> {
  try {
    const vegetables = await Vegetable.findAll();
    if (req.query.upperCase === 'true') {
      let upperCaseVegetables = vegetables.map((veg)=> {
          veg.name = veg.name.toUpperCase();
          return veg;
      });
      res.json(upperCaseVegetables);
    } else {
      res.json(vegetables);
    }
  } catch {
    res.sendStatus(500)
  }
});

router.post('/', async (req,res)=> {
  try {
    const vegetable = await Vegetable.create(req.body);
    res.json({ id: vegetable.id, msg: 'Successfully added: ' + vegetable.name});
  } catch (err) {
    res.status(403).json({err});
  }
});

router.delete('/:id', async(req,res)=> {
  try {
    const veg = await Vegetable.findByPk(parseInt(req.params.id));
    await veg.destroy();
    res.send('Successfully deleted: ' +  veg.name);
  } catch (err) {
    res.status(403).json({err});
  }

});

module.exports = router;