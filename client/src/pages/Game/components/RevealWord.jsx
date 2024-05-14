import React, { useState, useEffect } from 'react';

const RevealWord = ({ setRevealWord, word }) => {
    const [progress, setProgress] = useState(0);
    const revealWordTimer = 5;

    useEffect(() => {
      let timer;
  
      const runTimer = () => {
        timer = setInterval(() => {
            setProgress((prevProgress) => {
              if (prevProgress === 100) {
                clearInterval(timer);
                setRevealWord(false);
                return 100;
              }
              return prevProgress + (100 / (revealWordTimer * 10));
            });
        }, 100);
      };
  
      runTimer();
  
      return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-white rounded-lg w-[500px] h-[500px]">
            <p>Word: {word}</p>
            <div className="progress-bar">
            <div
                className="progress"
                style={{ width: `${progress}%` }}
            ></div>
            </div>
        </div>
    );
}

export default RevealWord;