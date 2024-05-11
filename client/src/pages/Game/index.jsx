import React, { useContext } from 'react';
import { SocketContext } from "../../providers/SocketProvider"

const GamePage = () => {
    const { socketData, sendData } = useContext(SocketContext);

    return (
        <div>
            Game Page
        </div>
    )
}

export default GamePage;