import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from "../../providers/SocketProvider"
import Banner from '../../assets/banner.png';

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
        console.log('read');
        const data = {
            action: 'ready',
            payload: null,
        }

        sendData(JSON.stringify(data));
    }

    return (
        <div className='w-screen h-screen bg-blue-600 p-10 flex flex-col items-center justify-center gap-y-5'>
            <img src={Banner} alt="" width={600}/>
            <div className='w-full flex flex-col items-center'>
                <h1>Lobby</h1>
                
            </div>
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