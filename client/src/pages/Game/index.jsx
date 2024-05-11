import React, { useContext, useRef, useEffect, useState } from 'react';
import { SocketContext } from "../../providers/SocketProvider"

const GamePage = () => {
    const { socketData, sendData } = useContext(SocketContext);
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

    useEffect(() => {
        if (socketData) {
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
        }
    }, [socketData]);

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
            x: e.clientX,
            y: e.clientY,
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
        <div>
            <canvas id="gameCanvas" width="800" height="600" ref={canvasRef}></canvas>
        </div>
    )
}

export default GamePage;