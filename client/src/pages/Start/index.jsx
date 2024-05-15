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
        <div className='flex flex-col items-center w-screen h-screen bg-repeat gap-y-5' style={{ backgroundImage: `url(${Background})`, backgroundColor: '#0A5EFB' }}>
            <div className='flex flex-col items-center gap-y-2 mb-4'>
                <img src={Banner} alt="" width={600} className='mt-[50px]'/>
                <p className='font-black text-white text-xl'>DRAW, GUESS, WIN</p>
            </div>
            {
                viewAvatars ? (
                    <AvatarSelection selectedAvatar={selectedAvatar} setSelectedAvatar={setSelectedAvatar} setViewAvatars={setViewAvatars}/>
                ) : (
                    <div className='flex flex-col items-center p-6 relative pt-4'>
                        <h1 className='font-bold absolute top-0 bg-[#FFBF1F] border-2 rounded-full px-4 py-2 border-[#043173] text-sm'>QUICK PLAY</h1>
                        <div className='flex flex-col items-center gap-y-4 bg-white border-2 border-[#043173] rounded-lg p-8'>
                            <div className='relative flex items-center justify-center pb-3 cursor-pointer' onClick={() => {setViewAvatars(true)}}>
                                <img src={Avatars[selectedAvatar]} alt='avatar' width={100} className='absolute mb-1.5'/>
                                <div className={`border-4 border-blue-500 rounded-full w-[110px] h-[110px] mt-5`}></div>
                                <p className={`font-bold bg-blue-500 rounded-full px-2 py-1 text-white absolute bottom-0 text-sm whitespace-nowrap`}>Change Avatar</p>
                            </div>
                            <input
                                maxlength="10"
                                className='w-48 p-2 text-center border-2 rounded-lg'
                                type="text"
                                value={username}
                                placeholder='Enter your nickname'
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <button disabled={username.length == 0} onClick={handleJoin} className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded w-full shadow-md drop-shadow-md'>
                                Join Room
                            </button>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default StartPage;