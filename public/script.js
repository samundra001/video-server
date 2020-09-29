//javascript for the frontend
const socket = io('/')
const videoGrid=document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;

let myVideoStream //we want it to be global
navigator.mediaDevices.getUserMedia({ //we user give access to goes to then
    video: true,
    audio: true
}).then(stream =>{
   myVideoStream = stream
   addVideoStream(myVideo,stream)
}) 

socket.emit('join-room');

const addVideoStream = (video,stream) =>{
    video.srcObject = stream ;
    video.addEventListener('loadedmetadata',()=>{
        video.play();
    })
   videoGrid.append(video);
}