import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from "../../providers/SocketProvider"

import Chat from './components/Chat';
import DrawingBoard from './components/DrawingBoard';
import StaticBoard from './components/StaticBoard';
import Timer from './components/Timer';
import Players from './components/Players';

const GamePage = () => {
    const { socketData, sendData, userId, players, drawer, word } = useContext(SocketContext);
    const [timerIsActive, setTimerIsActive] = useState(true);
    const [seconds, setSeconds] = useState(30);
    const [isDrawer, setIsDrawer] = useState(true);

    useEffect(() => {
        if (seconds === 0) {
            if (drawer.id === userId) {
                const data = {
                    action: 'next',
                    payload: null,
                }

                sendData(JSON.stringify(data));
            }

            setSeconds(30);
        }
    }, [seconds]);

    useEffect(() => {
        if (drawer.id === userId) {
            setIsDrawer(true);
        } else {
            setIsDrawer(false);
        }
    }, [drawer])

    return (
        <div className='flex items-center bg-blue-600'>
            <p>User id: {userId}</p>
            <Players players={players} drawer={drawer}/>
            {
                isDrawer ? (
                    <DrawingBoard sendData={sendData} />
                ) : (
                    <StaticBoard socketData={socketData} />

                )
            }
            <Timer isActive={timerIsActive} setIsActive={setTimerIsActive} seconds={seconds} setSeconds={setSeconds} />
            <Chat socketData={socketData} sendData={sendData} word={word} canChat={!isDrawer}/>
        </div>
    )
}

export default GamePage;