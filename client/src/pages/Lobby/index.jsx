import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from "../../providers/SocketProvider"
import Banner from '../../assets/banner.png';
import Background from '../../assets/bg-repeat.png';
import { Avatars } from '../../lib/utils';

const Lobby = ({ setStartGame, setJoin }) => {
    const { socketData, sendData, players, setPlayers } = useContext(SocketContext);
    const [isReady, setIsReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (!socketData) return;
        const { action, payload } = socketData;

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
        <div className='flex flex-col items-center w-screen h-screen bg-repeat gap-y-5' style={{ backgroundImage: `url(${Background})`, backgroundColor: '#0A5EFB'}}>
            <div className='flex flex-col items-center gap-y-2 mb-4'>
                <img src={Banner} alt="" width={600} className='mt-[50px]'/>
                <p className='font-black text-white text-xl'>DRAW, GUESS, WIN</p>
            </div>
            <div className='flex flex-col items-center w-[60%] relative pt-4'>
                <h1 className='font-bold absolute top-0 bg-[#FFBF1F] border-2 rounded-full px-4 py-2 border-[#043173] text-sm'>LOBBY</h1>
                <div className='w-full flex flex-wrap items-center justify-center gap-x-6 gap-y-4 bg-white border-2 border-[#043173] rounded-lg p-8'>
                    {Object.keys(players).map(player => (
                        <div className='flex flex-col items-center gap-y-2' key={players[player].id}>
                            <div className='relative flex items-center justify-center cursor-pointer pb-3'>
                                <img src={Avatars[players[player].avatar]} alt={`Avatar ${players[player].name}`} width={80} className='absolute'/>
                                <div className={`border-4 ${players[player].ready ? 'border-green-500' : 'border-blue-500'} rounded-full w-[90px] h-[90px] mt-5`}></div>
                                <p className={`font-bold ${players[player].ready ? 'bg-green-500' : 'bg-blue-500'} rounded-full px-2 py-1 text-white absolute bottom-0 text-sm`}>{players[player].name}</p>
                            </div>
                            {/* <img src={Avatars[players[player].avatar]} alt='avatar' width={80}/> */}
                        </div>
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
                        className={`${isReady ? 'bg-red-500 hover:bg-red-400 border-red-700 hover:border-red-500' : 'bg-green-500 hover:bg-green-400 border-green-700 hover:border-green-500'} text-white font-bold py-2 px-4 border-b-4 rounded shadow-md drop-shadow-md`}
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