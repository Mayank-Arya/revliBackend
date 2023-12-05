const mongoose = require('mongoose')

const connection = mongoose.connect('mongodb+srv://mayank:arya@cluster0.8xr2pbh.mongodb.net/Revli?retryWrites=true&w=majority')

module.exports = {connection}

