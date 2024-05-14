import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from "../../providers/SocketProvider"
import Banner from '../../assets/banner.png';
import { Avatars } from '../../lib/utils';

const Lobby = ({ setStartGame, setJoin }) => {
    const { socketData, sendData, players, setPlayers } = useContext(SocketContext);
    const [isReady, setIsReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (!socketData) return;
        const { action, payload } = socketData;
        console.log(action);

        if (action === 'join') {
            setPlayers(payload.players);
        }

        if (action === 'ready') {
            setPlayers(payload.players);
        }

        if (action === 'play') {
            setIsPlaying(true);
            setTimeout(() => {
                setJoin(false);
                setStartGame(true);
            }, 1000)
        }

        if (action === 'leave') {
            setPlayers(payload.players);
        }
    }, [socketData])

    const handleReady = () => {
        const data = {
            action: 'ready',
            payload: null,
        }

        sendData(JSON.stringify(data));
        setIsReady(true);
    }

    return (
        <div className='flex flex-col items-center justify-center w-screen h-screen p-10 bg-blue-600 gap-y-5'>
            <img src={Banner} alt="" width={600}/>
            <div className='flex flex-col items-center bg-white rounded-lg border w-[80%] p-8'>
                <h1 className='mb-4 font-bold'>LOBBY</h1>
                <div className='grid grid-cols-4 gap-x-4'>
                    {Object.keys(players).map(player => (
                        <div className='flex flex-col items-center gap-y-2'>
                            <img src={Avatars[players[player].avatar]} alt='avatar' width={80}/>
                            <p className='font-bold text-blue-500'>{players[player].name}</p>
                        </div>

                        // <div className='border-2 border-[#002043] bg-[#FFBF00] font-bold px-4 py-2 rounded-lg' key={players[player].id}>{players[player].name}</div>
                    ))}
                </div>
            </div>
            {
                isPlaying ? (
                    <div className='px-4 py-2 bg-[#FFBF00] font-bold border-[#002043] border-2 rounded-lg flex items-center justify-center'>
                        Starting Game ...
                    </div>
                ) : (
                    <button
                        className={`${isReady ? 'bg-red-500' : 'bg-green-500'} font-bold border-2 border-[#002043] rounded-lg py-2 px-4`}
                        onClick={handleReady}
                    >
                        {
                            isReady ? (
                                <p>Cancel</p>
                            ): (
                                <p>Ready</p>
                            )
                        }
                    </button>
                )
            }
        </div>
    )
}

export default Lobby;