import React, { useRef, useEffect } from 'react';

const DrawingBoard = ({ sendData }) => {
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
        <canvas id="gameCanvas" width="500" height="500" ref={canvasRef} className='border bg-white rounded-lg'></canvas>
    );
}

export default DrawingBoard;