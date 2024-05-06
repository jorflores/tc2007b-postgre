const express = require('express');
const router = express.Router();
const { addExerciseHabit } = require('../controllers/exerciseHabitController');

router.post('/add', addExerciseHabit);

module.exports = router;
