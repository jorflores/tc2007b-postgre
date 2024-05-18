const express = require('express');
const router = express.Router();
const { addExerciseHabit,getExerciseData } = require('../controllers/exerciseHabitController');

router.post('/add', addExerciseHabit);
router.post('/getExerciseHabit',getExerciseData )

module.exports = router;
