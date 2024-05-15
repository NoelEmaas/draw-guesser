import React, { useRef, useEffect } from 'react';

const DrawingBoard = ({ sendData, word }) => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const isDrawing = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        contextRef.current = context;
    }, []);

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const coords = getMouseCoords(canvasRef.current, e);
        const context = contextRef.current;
        context.beginPath();
        context.moveTo(coords.x, coords.y);

        const data = {
            action: 'start',
            currentX: coords.x,
            currentY: coords.y,
        }

        sendData(JSON.stringify(data));
    };

    const handleMouseMove = (e) => {
        if (!isDrawing.current) return;
        const coords = getMouseCoords(canvasRef.current, e);
        const context = contextRef.current;
        context.lineTo(coords.x, coords.y);
        context.stroke();

        const data = {
            action: 'draw',
            currentX: coords.x,
            currentY: coords.y,
        }

        sendData(JSON.stringify(data));
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
        const context = contextRef.current;
        context.closePath();

        const data = {
            action: 'stop',
        }

        sendData(JSON.stringify(data));
    };

    const getMouseCoords = (canvas, e) => {
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <div className='flex flex-col items-center relative pt-4'>
            <p className='absolute top-10'>{word && word.toUpperCase()}</p>
            <h1 className='font-bold absolute top-0 bg-[#FFBF1F] border-2 rounded-full px-4 py-1 border-[#043173] text-xs'>YOU ARE THE DRAWER</h1>
            <canvas id="gameCanvas" width={400} height={400} ref={canvasRef} className='bg-white rounded-lg border-2 border-[#043173]'></canvas>
        </div>
    );
}

export default DrawingBoard;