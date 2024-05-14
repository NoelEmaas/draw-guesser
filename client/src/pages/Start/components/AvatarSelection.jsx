import React, { useState, useEffect } from 'react';
import { Avatars } from '../../../lib/utils';

const AvatarSelection = ({ selectedAvatar, setSelectedAvatar, setViewAvatars }) => {
    return (
        <div className='flex flex-col items-center p-8 bg-white border rounded-lg gap-y-4'>
            <p className='text-lg font-bold text-blue-500'>Select Avatar</p>
            <div className='grid grid-cols-5 gap-6'>
                {Avatars.map((avatar, index) => (
                    <div className='relative flex items-center justify-center' onClick={() => {setSelectedAvatar(index)}}>
                        <img key={index} src={avatar} alt={`Avatar ${index}`} width={100} className='absolute mb-1.5'/>
                        <div className={`border-4 ${selectedAvatar === index ? 'border-blue-500' : 'border-white'} rounded-full w-[110px] h-[110px] mt-5`}></div>
                    </div>
                ))}
            </div>
            <button onClick={() => {setViewAvatars(false)}} className='bg-[#FFBF00] border-2 border-[#002043] rounded-lg font-bold w-[250px] py-2 mt-4'>
                Select Avatar
            </button>
        </div>
    )
}

export default AvatarSelection;