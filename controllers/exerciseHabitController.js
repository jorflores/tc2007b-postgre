const ExerciseHabit = require('../models/ExerciseHabit');  // Asegúrate de que la ruta de importación sea correcta y coincida con el nombre de archivo
const { Sequelize } = require('sequelize');

exports.addExerciseHabit = async (req, res) => {
  try {
    const { uid, exerciseLevel } = req.body;
    // Asegúrate de que las propiedades coincidan con las definidas en tu modelo Sequelize
    const newHabit = await ExerciseHabit.create({ 
      uid, 
      exerciseLevel 
    });
    res.status(201).json(newHabit);  // Cambié send por json para mantener consistencia en el formato de respuesta
  } catch (error) {
    // Es útil enviar detalles más específicos del error para facilitar la depuración
    res.status(400).json({ error: error.message });
  }
};



exports.getExerciseData = async (req, res) => {
  try {
    const { uid, startDate, endDate, formatted } = req.body;
    

    
    // Convert formatted to a boolean if it's a string
    const isFormatted = (typeof formatted === 'string') ? formatted.toLowerCase() === 'true' : Boolean(formatted);
   
    // Ensure startDate and endDate are provided
    if (!uid || !startDate || !endDate || !formatted) {
      return res.status(400).json({ error: 'Please provide uid, startDate,  endDate and formatted values' });
    }


    // Query the ExerciseHabit model
    const exerciseData = await ExerciseHabit.findAll({
      where: {
        uid: uid,
        date: {
          [Sequelize.Op.between]: [new Date(startDate), new Date(endDate)]
        }
      }
    });

    console.log(isFormatted)

    if (isFormatted) {
     // Format the date to only show the day of the month
 const formattedData = exerciseData.map(entry => {
  const formattedDate = new Date(entry.date).getDate(); // Extract the day of the month
  return {
    ...entry.toJSON(),
    date: formattedDate
  };
});

    res.status(200).json(formattedData);
}
else {
  res.status(200).json(exerciseData);
}



  } catch (error) {
    // Es útil enviar detalles más específicos del error para facilitar la depuración
    res.status(400).json({ error: error.message });
  }
};


