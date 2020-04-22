const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class Vegetable extends Model {}

Vegetable.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  origin: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 },
  },
  releaseDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, { sequelize, modelName: 'vegetable', timestamps: false });

sequelize.sync()
    .then(() => Vegetable.create({
      name: 'watermelon',
      origin: 'Turkey',
      price: 5,
      releaseDate: new Date(2020, 1, 10)
    }))
    .then((vegetable) => {
      console.log(vegetable.toJSON());
    });

module.exports = { sequelize, Sequelize, Vegetable };
