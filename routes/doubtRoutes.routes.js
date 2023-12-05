const express = require('express');
const doubtRouter = express.Router();

// const { findEligibleTutors } = require('../controllers/doubtController'); // We'll create this controller later

// Route to create a doubt request
doubtRouter.post('/doubt', async (req, res) => {
  try {
    // Extract required data from the request body (e.g., studentId, doubtSubject)
    const { studentId, doubtSubject } = req.body;

    // Call the controller to find eligible tutors and notify them
    await findEligibleTutors(studentId, doubtSubject);

    res.status(200).json({ msg: 'Doubt request created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

module.exports = {doubtRouter};

