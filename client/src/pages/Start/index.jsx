import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from "../../providers/SocketProvider"
import Banner from '../../assets/banner.png';
import Background from '../../assets/bg-repeat.png';

import { Avatars } from '../../lib/utils';
import AvatarSelection from './components/AvatarSelection';

const StartPage = ({ username, setUsername, setJoin }) => {
    const { connectToServer, sendData } = useContext(SocketContext);
    const [viewAvatars, setViewAvatars] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(0);

    useEffect(() => {
        connectToServer();
    }, []);

    const handleJoin = () => {
        const data = {
            action: 'join',
            payload: { 
                name: username,
                avatar: selectedAvatar
            }
        }

        sendData(JSON.stringify(data));
        setJoin(true);
    }

    return (
        <div className='flex flex-col items-center justify-center w-screen h-screen bg-repeat gap-y-5' style={{ backgroundImage: `url(${Background})` }}>
            <img src={Banner} alt="" width={600}/>
            {
                viewAvatars ? (
                    <AvatarSelection selectedAvatar={selectedAvatar} setSelectedAvatar={setSelectedAvatar} setViewAvatars={setViewAvatars}/>
                ) : (
                    <div className='flex flex-col items-center p-6 bg-white border rounded-lg gap-y-5'>
                        <div className='relative flex items-center justify-center' onClick={() => {setViewAvatars(true)}}>
                            <img src={Avatars[selectedAvatar]} alt='avatar' width={100} className='absolute mb-1.5'/>
                            <div className={`border-4 border-blue-500 rounded-full w-[110px] h-[110px] mt-5`}></div>
                        </div>
                        <p className='font-bold text-blue-500'>Select Avatars</p>
                        <input
                            className='w-48 p-2 text-center border-2 rounded-lg'
                            type="text"
                            value={username}
                            placeholder='Enter your nickname'
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button disabled={username.length == 0} onClick={handleJoin} className='bg-[#FFBF00] border-2 border-[#002043] rounded-lg font-bold w-full py-2'>
                            Join Room
                        </button>
                    </div>
                )
            }

        </div>
    )
}

export default StartPage;