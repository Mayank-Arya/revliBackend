const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/users')


const registerUser = async (req,res) => {
    try{
     const {userName, userType, password, userLanguage, classGrade,  subjectExpertise, registrationDetails} = req.body
     
     const isUserPresent = await User.findOne({registrationDetails})

    if(isUserPresent) {
        res.status(400).send({msg: 'User already present'})
    }

    bcrypt.hash(password,5, async, (err, hash) => {
        if(err){
            throw err
        }
        const user = new User({userName, userType, password:hash, userLanguage, classGrade, subjectExpertise, registrationDetails})
        user.save()
        res.status(200).send({msg:"Signup Successfull"})
       })
        
    }
    catch(err){
        console.log(err.message)
    }
}








module.exports = {registerUser}











