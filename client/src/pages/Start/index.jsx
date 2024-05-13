import React, { useContext, useEffect } from 'react';
import { SocketContext } from "../../providers/SocketProvider"
import Banner from '../../assets/banner.png';

const StartPage = ({ username, setUsername, setJoin }) => {
    const { connectToServer, sendData, userId } = useContext(SocketContext);

    useEffect(() => {
        connectToServer();
    }, [])

    const handleJoin = () => {
        const data = {
            action: 'join',
            payload: { name: username }
        }

        sendData(JSON.stringify(data));
        setJoin(true);
    }

    return (
        <div className='w-screen h-screen bg-blue-600 p-10 flex flex-col items-center justify-center gap-y-5'>
            <img src={Banner} alt="" width={600}/>
            <div className='bg-white border rounded-lg flex flex-col items-center'>
                <h1>Username</h1>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={handleJoin}>
                    Join Room
                </button>
            </div>
        </div>
    )
}

export default StartPage;