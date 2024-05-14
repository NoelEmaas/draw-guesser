import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from "../../providers/SocketProvider"

import Chat from './components/Chat';
import DrawingBoard from './components/DrawingBoard';
import StaticBoard from './components/StaticBoard';
import Timer from './components/Timer';
import Players from './components/Players';
import RevealWord from './components/RevealWord';

const GamePage = () => {
    const { socketData, sendData, userId, players, drawer, word, setWord } = useContext(SocketContext);
    const [timerIsActive, setTimerIsActive] = useState(false);
    const [seconds, setSeconds] = useState(30);
    const [isDrawer, setIsDrawer] = useState(true);

    const [revealWord, setRevealWord] = useState(false);

    useEffect(() => {
        if (!word) return;
        setTimerIsActive(true);
    }, [word]);

    useEffect(() => {
        if (seconds === 0) {
            if (drawer.id === userId) {
                const data = {
                    action: 'next',
                    payload: null,
                }

                sendData(JSON.stringify(data));
            }

            setRevealWord(true);
            setTimerIsActive(false);
            setSeconds(30);
            setWord(null);
        }
    }, [seconds]);

    useEffect(() => {
        if (drawer.id === userId) {
            setIsDrawer(true);
            if (word) return;
            const data = {
                action: 'set_word',
                payload: {
                    word: drawer.name,
                },
            }
    
            sendData(JSON.stringify(data));
        } else {
            setIsDrawer(false);
        }
    }, [drawer])

    return (
        <div className='flex items-center bg-blue-600'>
            <Players players={players} drawer={drawer}/>
            <div className='flex flex-col gap-y-2 w-[500px] py-4'>
                <div className='bg-white rounded-lg border w-full h-full p-4'>
                    <Timer isActive={timerIsActive} setIsActive={setTimerIsActive} seconds={seconds} setSeconds={setSeconds} />
                </div>
                {
                    isDrawer ? (
                    <DrawingBoard sendData={sendData} />

                    ) : (
                        <StaticBoard socketData={socketData} />
                    )
                }
            </div>
            <Chat socketData={socketData} player={players[userId]} drawer={drawer} sendData={sendData} word={word} canChat={!isDrawer}/>
        </div>
    )
}

export default GamePage;