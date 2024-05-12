import React, { useContext, useRef, useEffect } from 'react';
import { SocketContext } from "../../providers/SocketProvider"

import Chat from './components/Chat';
import DrawingBoard from './components/DrawingBoard';

const GamePage = () => {
    const { socketData, sendData } = useContext(SocketContext);

    return (
        <div className='flex items-center'>
            <DrawingBoard socketData={socketData} sendData={sendData} />
            <Chat socketData={socketData} sendData={sendData} />
        </div>
    )
}

export default GamePage;