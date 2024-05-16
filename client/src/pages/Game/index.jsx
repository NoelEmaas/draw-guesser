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

import FinalScores from '../FinalScores';

const GamePage = () => {
    // TODO: fix the repeated words, which I think causes the setWord not to be called again in useEffect

    const { socketData, sendData, userId, players, drawer, word, setWord , end } = useContext(SocketContext);
    const words = [
        'apple',
        'house',
        'sun',
        'tree',
        'flower',
        'car',
        'boat',
        'plane',
        'dog',
        'cat',
        'umbrella',
        'heart',
        'figure',
        'cake',
        'balloon',
        'ball',
        'cloud',
        'star',
        'rainbow',
        'book',
        'chair',
        'table',
        'scissors',
        'bulb',
        'ladder',
        'skateboard',
        'bicycle',
        'tent',
        'burger',
        'cone',
        'pizza',
        'butterfly',
        'bird',
        'fish',
        'moon',
        'key',
        'crown',
        'hat',
        'glasses',
        'sock',
        'shirt',
        'pants',
        'shoe',
        'glove',
        'backpack',
        'basket',
        'gift',
        'box',
        'bag',
        'envelope',
        'clock',
        'watch',
        'phone',
        'camera',
        'computer',
        'laptop',
        'mouse',
        'keyboard',
        'printer',
        'television',
        'radio',
        'microwave',
        'oven',
        'fridge',
        'toilet',
        'bath',
        'shower',
        'sink',
        'bed',
        'pillow',
        'chair',
        'table',
        'desk',
        'lamp',
        'mirror',
        'vase',
        'bowl',
        'plate',
        'cup',
        'mug',
        'fork',
        'spoon',
        'knife',
        'bottle',
        'box',
        'carton',
        'paper',
        'pen',
        'pencil',
        'ruler',
    ];
    const [timerIsActive, setTimerIsActive] = useState(false);
    
    const [seconds, setSeconds] = useState(30);
    const [isDrawer, setIsDrawer] = useState(true);
    const [revealWord, setRevealWord] = useState(false);
    const [guessed, setGuessed] = useState(false);

    const [wordToReveal, setWordToReveal] = useState('');

    useEffect(() => {
        if (!word) return;
        console.log('word changed', word);
        setWordToReveal(word);
        setTimerIsActive(true);
    }, [word]);

    useEffect(() => {
        if (seconds === 0) {
            setRevealWord(true);
            setTimerIsActive(false);
            setSeconds(30);
            setWord(null);
            setGuessed(false);

            setTimeout(() => {
                setRevealWord(false);

                if (drawer.id === userId) {
                    const data = {
                        action: 'next',
                        payload: null,
                    }
                    
                    console.log('trigger next drawer');
                    sendData(JSON.stringify(data));
                }
            }, 5000);
        }
    }, [seconds]);

    useEffect(() => {
        if (drawer.id === userId) {
            console.log('I am the drawer!');
            setIsDrawer(true);
            if (word) return;
            const data = {
                action: 'set_word',
                payload: {
                    word: words[Math.floor(Math.random() * words.length)],
                },
            }
            
            console.log('trigger next word', data.payload.word);
            sendData(JSON.stringify(data));
        } else {
            setIsDrawer(false);
        }
    }, [drawer])

    return (
        
            end ? (
                <FinalScores players={players} userId={userId}/>
            ) : (
                <div className='flex items-center h-screen' style={{ backgroundImage: `url(${Background})`, backgroundColor: '#0A5EFB'}} >
                    <Players players={players} drawer={drawer}/>
                    <div className='flex flex-col items-center gap-y-2 w-[440px] h-full p-4'>
                        <div className='flex flex-col items-center gap-y-2 mb-8'>
                            <img src={Banner} alt="" width={300} />
                            <p className='font-black text-white text-xs'>DRAW, GUESS, WIN</p>
                        </div>
                        {
        
                                revealWord ? (
                                    <RevealWord word={wordToReveal} />
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
                            
                        }
                    </div>
                    <Chat socketData={socketData} player={players[userId]} drawer={drawer} sendData={sendData} word={word} canChat={!isDrawer} seconds={seconds} guessed={guessed} setGuessed={setGuessed}/>
                </div>
            )
        
    )
}

export default GamePage;