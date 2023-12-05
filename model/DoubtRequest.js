const mongoose = require('mongoose')


const doubtRequestSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
    doubtSubject: {
        type: String,
        required: true
    },
    craetedAt: {
        type: Date,
        default: Date.now,
    }
})


const DoubtReq = mongoose.model('DoubtReq', doubtRequestSchema)

module.exports = DoubtReq