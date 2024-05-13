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
    <div>
      <h1>Countdown Timer</h1>
      <p>{seconds} seconds</p>
    </div>
  );
}

export default Timer;
