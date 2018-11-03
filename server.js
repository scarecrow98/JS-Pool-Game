const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const port = 8000;
const io = require('socket.io')(http);
let activePlayer = undefined;

app.use('/game', express.static(path.join(__dirname, '/game')));

app.get('/game', (req, res) => {
    res.sendFile(__dirname + '/game/index.html');
});

http.listen(port, () => {
    console.log('Server running...');
});

io.on('connection', (socket) => {

    io.clients((err, clients) => {
        console.log(clients);
        if (clients.length == 2) {
            activePlayer == clients[0];
        }
        console.log(activePlayer);
    });

    socket.emit('init game', {
        id: socket.id,
        isActive: activePlayer == socket.id ? true : false
    });

    socket.on('disconnect', () => {
        
    });

    socket.on('cueball update', (data) => {
        socket.broadcast.emit('cueball update', data);
    })

    socket.on('cue update', (data) => {
        socket.broadcast.emit('cue update', data);
    })
});

