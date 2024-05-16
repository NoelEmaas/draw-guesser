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
    <div className='flex flex-col gap-y-1 w-fit justify-center items-center bg-white p-2 border-2 border-[#043173] rounded-lg'>
      <p className='font-bold text-blue-500 text-xs'>TIME</p>
      <p>{seconds} seconds left</p>
    </div>
  );
}

export default Timer;
