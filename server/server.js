const net = require('net');
const crypto = require('crypto');

let sockets = {};
let players = {};
let drawerIndex = 0;
let gotCorrect = 0;
let rounds = 0;
let status = 'waiting';

const server = net.createServer(socket => {
    const id = crypto.randomBytes(8).toString('hex');
    sockets[id] = socket;

    console.log('A client has connected.');

    socket.on('data', data => {
        const jsonString = data.toString('utf8');
        const indexToCut = jsonString.indexOf('}{');

        if (indexToCut !== -1) {
            const potentialJsonSegments = jsonString.split('}{');
            let dataSegments = new Set();

            for (let i = 0; i < potentialJsonSegments.length; i++) {
                let segment = potentialJsonSegments[i];
      
                if (i < potentialJsonSegments.length - 1) {
                  segment += '}';
                }
      
                if (i > 0) {
                  segment = '{' + segment;
                }
                
                const parsedData = JSON.parse(segment);
                dataSegments.add(parsedData);
            }

            for (const dataToSend of dataSegments) {
                const { action, payload } = dataToSend;

                if (action === 'join') {
                    const { name, avatar } = payload;
                    players[id] = { 
                        id: id,
                        name: name,
                        avatar: avatar,
                        score: 0,
                        ready: false,
                        correct: false,
                    };
        
                    broadcast(socket, JSON.stringify({ action: 'join', payload: { players: players }}));
                    socket.write(JSON.stringify({ action: 'get_id', payload: { id: id } }));
                    continue;
                }
        
                if (action == 'ready') {
                    players[id].ready = true;
                    broadcast(socket, JSON.stringify({ action: 'ready', payload: { players: players }}));
        
                    if (allPlayersReady()) {
                        broadcast(socket, JSON.stringify({ action: 'play', payload: { players: players }}));
                        broadcast(socket, JSON.stringify({ action: 'next', payload: { players: players, drawer: players[Object.keys(players)[drawerIndex]] }}));
                        status = 'playing';
                    }
        
                    continue;
                }
        
                if (action == 'next') {
                    gotCorrect = 0;
                    rounds += 1;
        
                    if (rounds == Object.keys(players).length) {
                        players = Object.fromEntries(Object.entries(players).sort((a, b) => b[1].score - a[1].score));
                        broadcast(socket, JSON.stringify({ action: 'end', payload: { players: players }}));
                        status = 'waiting';
                        rounds = 0;
                        continue;
                    }
        
                    for (const [id, player] of Object.entries(players)) {
                        player.correct = false;
                    }
        
                    drawerIndex = (drawerIndex + 1) % Object.keys(players).length;
                    broadcast(socket, JSON.stringify({ action: 'next', payload: { players: players, drawer: players[Object.keys(players)[drawerIndex]] }}));
                    continue;
                }
        
                if (action == 'set_word') {
                    broadcast(socket, JSON.stringify({ action: 'set_word', payload: { word: payload.word }}));
                    continue;
                }
        
                if (action == 'message') {
                    const { correct, drawerId, timeGuessed } = payload;
                    if (correct) {
                        players[id].correct = true;
                        players[id].score += ((Object.keys(players).length - gotCorrect - 1) * 10) + timeGuessed;
                        players[drawerId].score += 10;
                        gotCorrect += 1;
                        broadcast(socket, JSON.stringify({ action: 'score', payload: { players: players }}));
                    } 
        
                    broadcast(socket, data);
                    continue;
                }
        
                broadcast(socket, data);
            }

            return;
        } 

        const { action, payload } = JSON.parse(jsonString);

        if (action === 'join') {
            const { name, avatar } = payload;
            players[id] = { 
                id: id,
                name: name,
                avatar: avatar,
                score: 0,
                ready: false,
                correct: false,
            };

            broadcast(socket, JSON.stringify({ action: 'join', payload: { players: players }}));
            socket.write(JSON.stringify({ action: 'get_id', payload: { id: id } }));
            return;
        }

        if (action == 'ready') {
            players[id].ready = true;
            broadcast(socket, JSON.stringify({ action: 'ready', payload: { players: players }}));

            if (allPlayersReady()) {
                broadcast(socket, JSON.stringify({ action: 'play', payload: { players: players }}));
                broadcast(socket, JSON.stringify({ action: 'next', payload: { players: players, drawer: players[Object.keys(players)[drawerIndex]] }}));
                status = 'playing';
            }

            return;
        }

        if (action == 'next') {
            gotCorrect = 0;
            rounds += 1;

            if (rounds == Object.keys(players).length) {
                players = Object.fromEntries(Object.entries(players).sort((a, b) => b[1].score - a[1].score));
                broadcast(socket, JSON.stringify({ action: 'end', payload: { players: players }}));
                status = 'waiting';
                rounds = 0;
                return;
            }

            for (const [id, player] of Object.entries(players)) {
                player.correct = false;
            }

            drawerIndex = (drawerIndex + 1) % Object.keys(players).length;
            broadcast(socket, JSON.stringify({ action: 'next', payload: { players: players, drawer: players[Object.keys(players)[drawerIndex]] }}));
            return;
        }

        if (action == 'set_word') {
            broadcast(socket, JSON.stringify({ action: 'set_word', payload: { word: payload.word }}));
            return;
        }

        if (action == 'message') {
            const { correct, drawerId, timeGuessed } = payload;
            if (correct) {
                players[id].correct = true;
                players[id].score += ((Object.keys(players).length - gotCorrect - 1) * 10) + timeGuessed;
                players[drawerId].score += 10;
                gotCorrect += 1;
                broadcast(socket, JSON.stringify({ action: 'score', payload: { players: players }}));
            } 

            broadcast(socket, data);
            return;
        }

        broadcast(socket, data);
    });

    socket.on('error', err => {
        console.log('A client has disconnected.');
        removePlayer(socket, id);
    });

    socket.on('close', () => {
        console.log("A client has left.");
        removePlayer(socket, id);
    });
});

server.listen(8000, 'SERVER_IP_ADDRESS');

function broadcast(sender, data) {
    for (const [id, socket] of Object.entries(sockets)) {
        if (socket !== sender) {
            socket.write(data);
        }
    }
}

function allPlayersReady() {
    for (const [id, player] of Object.entries(players)) {
        if (!player.ready) {
            return false;
        }
    }

    return true;
}

function removePlayer(socket, id) {
    const player_left = players[id];
    delete sockets[id];
    delete players[id];
    broadcast(socket, JSON.stringify({ action: 'leave', payload: { players: players, player_left: player_left}}));

    if (allPlayersReady()) {
        broadcast(socket, JSON.stringify({ action: 'start', payload: { players: players }}));
    }
}