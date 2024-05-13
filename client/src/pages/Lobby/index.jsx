import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from "../../providers/SocketProvider"

const Lobby = ({ setStartGame, setJoin }) => {
    const { socketData, sendData, setUserId, userId } = useContext(SocketContext);
    const [players, setPlayers] = useState({});

    useEffect(() => {
        if (!socketData) return;
        const { action, payload } = socketData;
        console.log(action);

        if (action === 'join') {
            setPlayers(payload.players);
            setUserId(payload.id);
        }

        if (action === 'ready') {
            setPlayers(payload.players);
        }

        if (action === 'play') {
            setJoin(false);
            setStartGame(true);
        }

        if (action === 'leave') {
            setPlayers(payload.players);
        }

        if (action === 'get_id') {
            setUserId(payload.id);
        }
    }, [socketData])

    const handleReady = () => {
        const data = {
            action: 'ready',
            payload: null,
        }

        sendData(JSON.stringify(data));
    }

    return (
        <div className="flex flex-col">
            <h1>Lobby</h1>
            <h4>Players:</h4>
            <ul>
                {Object.keys(players).map(player => (
                    <li key={players[player].id}>{players[player].name} - {players[player].id}</li>
                ))}
            </ul>
            <button
            onClick={handleReady}
            >
                Ready
            </button>
        </div>
    )
}

export default Lobby;