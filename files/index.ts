import Game from './game'
import GameObject from './gameobject'
import io from 'socket.io-client'
import { Console } from 'console';



var game = new Game(600, 700);
var x =  10
var y = 10
var socket = io.connect();
var clientNum = 0;
var spawn = new GameObject(40, 40, 0, 0, 'grey', false);
game.Add(spawn);

game.Render();
socket.on('sendClientNum', function(_clientNum) {
    clientNum = _clientNum;
    
})
socket.emit('sendObjDetails', {xPos: x, yPos: y});
socket.on('playerJoined', function(data) {
    for(var i = 0; i < data.length; i++)
    {
        
        game.NetworkObjects[i] = new GameObject(20, 20, data[i].xPos, data[i].yPos, "blue", data[i].hidden);
        
    }
    game.Update();
})


document.addEventListener('keydown', function(ev) {
    switch(ev.key)
    {
        case 'w':
            socket.emit('moveUp', clientNum);
            break;
        case 'a':
            socket.emit('moveLeft', clientNum);
            break;
        case 's':
            socket.emit('moveDown', clientNum);
            break;
        case 'd':
            socket.emit('moveRight', clientNum);
    }
});

socket.on('moveUp', function(clientNumm) {
    game.NetworkObjects[clientNumm].Move(0, -10);
    for(var i = 0; i < game.NetworkObjects.length; i++)
    {
        if(i != clientNumm)
        {
            if(game.CheckCollisions(game.NetworkObjects[clientNumm], game.NetworkObjects[i]))
            {
                socket.emit('hideObj', i);
                break;
            }
        }
        
    }
    
    game.Update();
})
socket.on('moveLeft', function(clientNumm) {
    game.NetworkObjects[clientNumm].Move(-10, 0);
    for(var i = 0; i < game.Objects.length; i++)
    {
        if(i != clientNumm)
        {
            if(game.CheckCollisions(game.NetworkObjects[clientNumm], game.NetworkObjects[i]))
            {
                socket.emit('hideObj', i);
                break;
            }
        }
        
    }
    game.Update();
});
socket.on('moveDown', function(clientNumm) {
    game.NetworkObjects[clientNumm].Move(0, 10);
    for(var i = 0; i < game.NetworkObjects.length; i++)
    {
        if(i != clientNumm)
        {
            if(game.CheckCollisions(game.NetworkObjects[clientNumm], game.NetworkObjects[i]))
            {
                socket.emit('hideObj', i);
                break;
            }
        }
        
    }
    game.Update();
});
socket.on('moveRight', function(clientNumm) {
    game.NetworkObjects[clientNumm].Move(10, 0);
    for(var i = 0; i < game.NetworkObjects.length; i++)
    {
        if(i != clientNumm)
        {
            if(game.CheckCollisions(game.NetworkObjects[clientNumm], game.NetworkObjects[i]))
            {
                socket.emit('hideObj', i);
                break;
            }
        }
        
    }
    game.Update();
})
socket.on('hideObj', function(i) {
    
    game.NetworkObjects[i].Hidden = true;
    if(clientNum == i)
    {
        window.location.href = '/youlose';
    }
    game.Update();
})









