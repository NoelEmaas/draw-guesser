import React, { useState, useEffect } from 'react';

function Timer({ isActive, setIsActive, seconds, setSeconds }) {
  useEffect(() => {
    let intervalId;

    if (isActive && seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isActive, seconds]);

  return (
    <div className='flex items-center gapx-x-2'>
      <p className='font-bold text-blue-500'>Time:</p>
      <p>{seconds} seconds left</p>
    </div>
  );
}

export default Timer;
