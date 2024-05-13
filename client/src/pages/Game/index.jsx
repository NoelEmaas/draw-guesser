import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from "../../providers/SocketProvider"

import Chat from './components/Chat';
import DrawingBoard from './components/DrawingBoard';
import Timer from './components/Timer';

const GamePage = () => {
    const { socketData, sendData, userId } = useContext(SocketContext);
    const [timerIsActive, setTimerIsActive] = useState(false);
    const [seconds, setSeconds] = useState(30);
    const [drawer, setDrawer] = useState({});
    const [word, setWord] = useState('');

    useEffect(() => {
        if (seconds === 0) {
            const data = {
                action: 'next',
                payload: null,
            }

            sendData(JSON.stringify(data));
            setTimerIsActive(false);
            setSeconds(30);
        }
    }, [seconds]);

    useEffect(() => {
        if (!socketData) return;
        const { action, payload } = socketData;

        if (action === 'next') {
            const { drawer, word } = payload;
            setDrawer(drawer);
            setWord(word);

            console.log('drawer', drawer);
            setTimerIsActive(true);
        }
    }, [socketData]);

    return (
        <div className='flex items-center'>
            <p>{userId}</p>
            <DrawingBoard socketData={socketData} sendData={sendData} />
            <Timer isActive={timerIsActive} setIsActive={setTimerIsActive} seconds={seconds} setSeconds={setSeconds} />
            <Chat socketData={socketData} sendData={sendData} />
        </div>
    )
}

export default GamePage;