const express = require('express');
const app = express();
const socketio = require('socket.io');



app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
    
})
app.get('/youlose', function(req, res) {
    res.send('You lose!');
})

const server = app.listen(8080);

var io = socketio(server);

var objects = []
var clientCount = 0;
io.on('connection', function(socket) {
    clientCount++;
    socket.emit('sendClientNum', clientCount - 1);
    socket.on('sendObjDetails', function(data){
        objects.push(data);
        io.sockets.emit('playerJoined', objects);
    });
    socket.on('disconnect', function() {
        
    })

    socket.on('moveUp', function(clientNum) {
        objects[clientNum].yPos -= 10;
        io.sockets.emit('moveUp', clientNum);
    });
    socket.on('moveLeft', function(clientNum) {
        objects[clientNum].xPos -= 10;
        io.sockets.emit('moveLeft', clientNum)
    });
    socket.on('moveDown', function(clientNum) {
        objects[clientNum].yPos += 10;
        io.sockets.emit('moveDown', clientNum);
    });
    socket.on('moveRight', function(clientNum) {
        objects[clientNum].xPos += 10;
        io.sockets.emit('moveRight', clientNum);
    })
    socket.on('hideObj', function(i) {
        objects[i].hidden = true;
        io.sockets.emit('hideObj', i)
    })
    
})

