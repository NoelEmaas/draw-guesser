import React, { useContext } from 'react';
import { SocketContext } from "../../providers/SocketProvider"

const StartPage = ({ username, setUsername, setStartGame }) => {
    const { connectToServer } = useContext(SocketContext);

    return (
        <div>
            <h1>Username</h1>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={() =>  {
                connectToServer()
                setStartGame(true)
            }}>
                Start Game
            </button>
        </div>
    )
}

export default StartPage;