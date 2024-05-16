import React, { useState, useEffect } from 'react';

const RevealWord = ({ word }) => {
    const [progress, setProgress] = useState(0);
    const revealWordTimer = 5;

    useEffect(() => {
      let timer;
  
      const runTimer = () => {
        timer = setInterval(() => {
            setProgress((prevProgress) => {
              if (prevProgress === 100) {
                clearInterval(timer);
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
        <div className="bg-white rounded-lg w-full h-[440px] flex flex-col items-center justify-center  border-2 border-[#043173]">
            <p className='text-slate-500 text-sm'>Correct Word:</p>
            <h1 className='font-bold text-blue-500 mb-4 text-2xl'>{word.toUpperCase()}</h1>
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