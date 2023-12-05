const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type:String,
        requried:true
    },
    userType: {
        type: String, 
        enum: ['Student', 'Tutor'], 
        required: true
    },
    password: {
            type: String,
            required: true
        }, 
    userLanguage: { 
        type: String, 
        required: true
    }, 
    classGrade: {
        type: Number, 
        required: function(){
            return this.userType === 'Student'
        }
    }, 
    subjectExpertise: {
        type: String, 
        enum: ['Math', 'Science', 'English', 'History', 'Hindi'],
        required: function(){
            return this.userType === 'Tutor'
        }
    }, 
    registrationDetails: {
        type: Object
    }
})

const User = mongoose.model('user', userSchema)

module.exports = User;


