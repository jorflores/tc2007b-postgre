const ExerciseHabit = require('../models/ExerciseHabit');  // Asegúrate de que la ruta de importación sea correcta y coincida con el nombre de archivo

exports.addExerciseHabit = async (req, res) => {
  try {
    const { userId, exerciseLevel } = req.body;
    // Asegúrate de que las propiedades coincidan con las definidas en tu modelo Sequelize
    const newHabit = await ExerciseHabit.create({ 
      userId, 
      exerciseLevel 
    });
    res.status(201).json(newHabit);  // Cambié send por json para mantener consistencia en el formato de respuesta
  } catch (error) {
    // Es útil enviar detalles más específicos del error para facilitar la depuración
    res.status(400).json({ error: error.message });
  }
};
