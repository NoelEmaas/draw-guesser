const net = require('net');
const crypto = require('crypto');

let sockets = {};
let players = {};
let status = 'waiting';

const server = net.createServer(socket => {
    const id = crypto.randomBytes(8).toString('hex');
    sockets[id] = socket;

    socket.on('data', data => {
        const { action, payload } = JSON.parse(data.toString());

        if (action === 'join') {
            const { name } = payload;
            players[id] = { 
                name: name,
                id: id,
                score: 0,
                ready: false,
            };

            broadcast(socket, JSON.stringify({ action: 'join', payload: { players: players }}));
            return;
        }

        if (action == 'ready') {
            players[id].ready = true;
            broadcast(socket, JSON.stringify({ action: 'ready', payload: { players: players }}));

            if (allPlayersReady()) {
                broadcast(socket, JSON.stringify({ action: 'start', payload: { players: players }}));
            }

            return;
        }

        broadcast(socket, data);
    });

    socket.on('error', err => {
        console.log('A client has disconnected.');
        const player_left = players[id];
        delete sockets[id];
        delete players[id];
        broadcast(socket, JSON.stringify({ action: 'leave', payload: { players: players, player_left: player_left}}));

        if (allPlayersReady()) {
            broadcast(socket, JSON.stringify({ action: 'start', payload: { players: players }}));
        }
    });

    socket.on('close', () => {
        console.log("A client has left.");
        const player_left = players[id];
        delete sockets[id];
        delete players[id];
        broadcast(socket, JSON.stringify({ action: 'leave', payload: { players: players, player_left: player_left}}));

        if (allPlayersReady()) {
            broadcast(socket, JSON.stringify({ action: 'start', payload: { players: players }}));
        }
    });
});

server.listen(1235, '127.0.0.1');

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