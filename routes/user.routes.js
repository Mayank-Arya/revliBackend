const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/users');

userRouter.post('/register', async (req, res) => {
  try {
    const { userName, userType, password, userLanguage, classGrade, subjectExpertise, registrationDetails } = req.body;

    const isUserPresent = await User.findOne({ registrationDetails });

    if (isUserPresent) {
      return res.status(400).json({ msg: 'User already present' });
      
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const user = new User({
      userName,
      userType,
      password: hashedPassword,
      userLanguage,
      classGrade,
      subjectExpertise,
      registrationDetails,
    });

    await user.save();

    res.status(200).send({ msg: 'Signup successful' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: 'Internal server error' });
  }
});



userRouter.post('/login', async (req, res) => {
    try {
      const { registrationDetails, password } = req.body;
  
      const user = await User.findOne({ registrationDetails });
  
      if (!user) {
        return res.status(404).send({ msg: 'User not found' });
      }

   // bcrypt.compare to compare the entered password with the hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ msg: 'Incorrect password' });
      }
  
      // Generate JWT token for authentication
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
  
      res.status(200).send({ userId: user._id, token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ msg: 'Internal server error' });
    }
  });




module.exports = {userRouter};
