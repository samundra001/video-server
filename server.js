const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server)
const { v4:uuidv4 } = require('uuid');
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server,{
    debug:true
});
app.set('view engine','ejs');
app.use(express.static('public'));//hey server our public file is going to be here
app.use('/peerjs',peerServer);
app.get('/',(req,res)=>{
    res.redirect(`/${uuidv4()}`); //goes to api for room id with unique room id 
})

//set a api for a room id
app.get('/:room',(req,res)=>{
    res.render('room',{ roomId: req.params.room })
})


io.on('connection',socket =>{
    socket.on('join-room',(roomId,userId)=>{
       socket.join(roomId);
       socket.to(roomId).broadcast.emit('user-connected',userId);
    })
})




// const port = process.env.PORT || 3030
server.listen(3030,()=>{
    console.log(`server is runnning`)
});