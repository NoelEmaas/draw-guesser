import React, { useRef, useEffect } from 'react';

const StaticBoard = ({ socketData }) => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

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
        <canvas width="600" height="600" ref={canvasRef} className='border'></canvas>
    );
}

export default StaticBoard;