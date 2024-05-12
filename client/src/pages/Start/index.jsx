import React, { useContext, useEffect } from 'react';
import { SocketContext } from "../../providers/SocketProvider"

const StartPage = ({ username, setUsername, setJoin }) => {
    const { connectToServer, sendData } = useContext(SocketContext);

    useEffect(() => {
        connectToServer();
    }, [])

    return (
        <div>
            <h1>Username</h1>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={() =>  {
                const data = {
                    action: 'join',
                    payload: { name: username }
                }

                sendData(JSON.stringify(data));
                setJoin(true);
            }}>
                Join Room
            </button>
        </div>
    )
}

export default StartPage;