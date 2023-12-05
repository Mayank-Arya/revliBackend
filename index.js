const express = require('express')
const {connection} = require('./config/db')
const {userRouter} = require('./routes/user.routes')
const http = require('http')
const socketIo = require('socket.io')
const {doubtRouter} = require('./routes/doubtRoutes.routes')
const app = express()
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("Hello EveryOne")
})

app.use('/user',userRouter)
app.use('/doubt',doubtRouter)

const server = http.createServer(app)
const io = socketIo(server)

app.listen(9090, async () => {
    try{
     await connection
     console.log('connected to database')
    }
    catch(err){
        console.log(err.message)
    }
    console.log('Server running at 9090')
})


