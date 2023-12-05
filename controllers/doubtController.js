// controllers/doubtController.js

const User = require('../model/users');
const TutorAvailability = require('../model/tutorAvailability');
const DoubtRequest = require('../model/doubtRequest');

const http = require('http')
const socketIo = require('socket.io')

const server = http.createServer()
const io = socketIo(server)

const connectedTutors = new Set()

io.on('connection',(socket) => {
    console.log('New Connection', socket.id)
})

socket.on('tutorConnect', (tutorId) => {
    console.log("Tutor connected:", tutorId)
    connnectTutor.add(tutorId)
})

socket.on('disconnect', () => {
    console.log("User disconnected",socket.id)
    connectedTutors.delete(socket.io)
})

const findEligibleTutors = async (studentId, doubtSubject) => {
  try {
    // Find online tutors matching the student's criteria
    const eligibleTutors = await TutorAvailability.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'tutorId',
          foreignField: '_id',
          as: 'tutorInfo',
        },
      },
      {
        $match: {
          'tutorInfo.userType': 'Tutor',
          'tutorInfo.subjectExpertise': doubtSubject,
          'tutorInfo.classGrade': { $gte: 1 }, // Adjust the range as needed
        },
      },
    ]);

    eligibleTutors.forEach((tutor) => {
        const tutorSocket = io.sockets.sockets.get(tutor.tutorId.toString())
        if(tutorSocket){
            tutorSocket.emit('newDoubtRequest', {studentId,doubtSubject})
        }
    })

    // Create a doubt request record
    await DoubtRequest.create({ studentId, doubtSubject });

    console.log('Eligible tutors notified:', eligibleTutors);
  } catch (error) {
    console.error(error);
    throw new Error('Error finding eligible tutors');
  }
};

module.exports = { findEligibleTutors, server };
