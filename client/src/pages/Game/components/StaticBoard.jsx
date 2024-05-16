import React, { useRef, useEffect } from 'react';

const StaticBoard = ({ socketData, numberOfLetters }) => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const underscores = Array(numberOfLetters).fill('_').map((_, index) => <p key={index}>_</p>);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        contextRef.current = context;
    }, []);

    useEffect(() => {
        if (!socketData) return;

        const { action } = socketData;
        const context = contextRef.current;

        switch (action) {
            case 'start':
                context.beginPath();
                context.moveTo(socketData.currentX, socketData.currentY);
                break;
            case 'draw':
                context.lineTo(socketData.currentX, socketData.currentY);
                context.stroke();
                break;
            case 'stop':
                context.closePath();
                break;
            case 'print':
                console.log('Received print action');
                break;
            default:
                break;
        }
    }, [socketData]);

    return (
        <div className='flex flex-col items-center relative pt-4'>
            <div className='absolute top-10 flex items-center gap-x-2'>{underscores}</div>
            <h1 className='font-bold absolute top-0 bg-[#FFBF1F] border-2 rounded-full px-4 py-1 border-[#043173] text-xs'>YOU ARE A GUESSER</h1>
            <canvas ref={canvasRef} width={400} height={400} className='border-2 border-[#043173] bg-white rounded-lg w-full'></canvas>
        </div>
    );
}

export default StaticBoard;