const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ExerciseHabit = sequelize.define('ExerciseHabits', {
  uid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'uid'
    }
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  exerciseLevel: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = ExerciseHabit;
