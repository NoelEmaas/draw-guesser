import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from "../../providers/SocketProvider"

import Chat from './components/Chat';
import DrawingBoard from './components/DrawingBoard';
import StaticBoard from './components/StaticBoard';
import Timer from './components/Timer';
import Players from './components/Players';
import RevealWord from './components/RevealWord';
import EndGame from './components/EndGame';

const GamePage = () => {
    const { socketData, sendData, userId, players, drawer, word, setWord , end } = useContext(SocketContext);
    const words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon', 'mango', 'nectarine', 'orange', 'papaya', 'quince', 'raspberry', 'strawberry', 'tangerine', 'ugli', 'vanilla', 'watermelon', 'ximenia', 'yuzu', 'zucchini'];
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
            setRevealWord(true);
            setTimerIsActive(false);
            setSeconds(30);

            setTimeout(() => {
                setRevealWord(false);
                setWord(null);

                if (drawer.id === userId) {
                    const data = {
                        action: 'next',
                        payload: null,
                    }

                    console.log('request next');

                    sendData(JSON.stringify(data));
                }
            }, 5000);
        }
    }, [seconds]);

    useEffect(() => {
        if (drawer.id === userId) {
            setIsDrawer(true);
            if (word) return;
            const data = {
                action: 'set_word',
                payload: {
                    word: words[Math.floor(Math.random() * words.length)],
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
            <div className='flex flex-col gap-y-2 w-[500px] py-2'>
                <div className='flex items-center justify-between w-full h-full p-4 bg-white border rounded-lg'>
                    <Timer isActive={timerIsActive} setIsActive={setTimerIsActive} seconds={seconds} setSeconds={setSeconds} />
                    {
                        isDrawer ? (
                            <p className='font-bold text-blue-500'>YOU ARE THE DRAWER</p>
                        ) : (
                            <p className='font-bold text-blue-500'>YOUR ARE A GUESSER</p>
                        )
                    }
                    {
                        isDrawer ? (
                            <p>Word: {word}</p>
                        ) : (
                            <p>Hint: {word && word.length} letters</p>
                        )
                    }
                    {/* Word: {word} */}
                </div>
                {
                    end ? (
                        <EndGame players={players} />
                    ) : (
                        revealWord ? (
                            <RevealWord word={word} />
                        ) : (
                            isDrawer ? (
                                <DrawingBoard sendData={sendData} />
                            ) : (
                                <StaticBoard socketData={socketData} />
                            )
                        )
                    )
                }
            </div>
            <Chat socketData={socketData} player={players[userId]} drawer={drawer} sendData={sendData} word={word} canChat={!isDrawer}/>
        </div>
    )
}

export default GamePage;