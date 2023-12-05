const mongoose = require('mongoose')

const tutorAvailability = mongoose.Schema({
    tutorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    }, 
    lastPingTime: {
        type: Date, 
        default: Date.now
    }
})


const tutor_avb = mongoose.model('Availability_tutor', tutorAvailability)
module.exports = tutor_avb