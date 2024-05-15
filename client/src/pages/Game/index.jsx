import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from "../../providers/SocketProvider"

import Chat from './components/Chat';
import DrawingBoard from './components/DrawingBoard';
import StaticBoard from './components/StaticBoard';
import Timer from './components/Timer';
import Players from './components/Players';
import RevealWord from './components/RevealWord';
import EndGame from './components/EndGame';

import Banner from '../../assets/banner.png';
import Background from '../../assets/bg-repeat.png';

const GamePage = () => {
    // TODO: fix the repeated words, which I think causes the setWord not to be called again in useEffect

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
        <div className='flex items-center h-screen' style={{ backgroundImage: `url(${Background})`, backgroundColor: '#0A5EFB'}} >
            <Players players={players} drawer={drawer}/>
            <div className='flex flex-col items-center gap-y-2 w-[440px] h-full p-4'>
                <div className='flex flex-col items-center gap-y-2 mb-8'>
                    <img src={Banner} alt="" width={300} />
                    <p className='font-black text-white text-xs'>DRAW, GUESS, WIN</p>
                </div>
                {
                    end ? (
                        <EndGame players={players} />
                    ) : (
                        revealWord ? (
                            <RevealWord word={word} />
                        ) : (
                            isDrawer ? (
                                <>
                                    <DrawingBoard sendData={sendData} word={word}/>
                                    <Timer isActive={timerIsActive} setIsActive={setTimerIsActive} seconds={seconds} setSeconds={setSeconds} />
                                </>
                            ) : (
                                <>
                                    <StaticBoard socketData={socketData} numberOfLetters={word && word.length}/>
                                    <Timer isActive={timerIsActive} setIsActive={setTimerIsActive} seconds={seconds} setSeconds={setSeconds} />
                                </>
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