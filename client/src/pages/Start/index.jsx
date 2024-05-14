import React, { useContext, useEffect } from 'react';
import { SocketContext } from "../../providers/SocketProvider"
import Banner from '../../assets/banner.png';

const StartPage = ({ username, setUsername, setJoin }) => {
    const { connectToServer, sendData } = useContext(SocketContext);

    useEffect(() => {
        connectToServer();
    }, []);

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
            <div className='bg-white border rounded-lg flex flex-col items-center p-6 gap-y-5'>
                <input
                    className='border-2 p-2 w-48 text-center rounded-lg'
                    type="text"
                    value={username}
                    placeholder='Enter your nickname'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button disabled={username.length == 0} onClick={handleJoin} className='bg-[#FFBF00] border-2 border-[#002043] rounded-lg font-bold w-full py-2'>
                    Join Room
                </button>
            </div>
        </div>
    )
}

export default StartPage;