const express = require('express');
const app = express();
let Game = require("./Game/Game");
let http = require('http').createServer(app);
let io = require('socket.io')(http);

let socket_list = []
app.use(express.static('public'))
let g = new Game();
g.update();
io.on('connection', newConnection);
function newConnection(socket){
    socket_list.push(socket);
    console.log("Connection has been made by "+socket.id);
}

http.listen(3000, function(){
  console.log('listening on *:3000');
});

function find_socket(id){
  for(let s of socket_list){
    if(s.d == id) return s;
  }
  return -1;
}
