import React, { useState, useEffect } from 'react';
import { Avatars } from '../../../lib/utils';

const AvatarSelection = ({ selectedAvatar, setSelectedAvatar, setViewAvatars }) => {
    return (
        <div className='flex flex-col items-center relative pt-4'>
            <h1 className='font-bold absolute top-0 bg-[#FFBF1F] border-2 rounded-full px-4 py-2 border-[#043173] text-sm'>CHOOSE AVATAR</h1>
            <div className='flex flex-col items-center gap-y-4 bg-white border-2 border-[#043173] rounded-lg p-8'>
                <div className='grid grid-cols-5 gap-5'>
                    {Avatars.map((avatar, index) => (
                        <div className='relative flex items-center justify-center cursor-pointer' onClick={() => {setSelectedAvatar(index)}}>
                            <img key={index} src={avatar} alt={`Avatar ${index}`} width={80} className='absolute'/>
                            <div className={`border-4 ${selectedAvatar === index ? 'border-blue-500' : 'border-white'} rounded-full w-[90px] h-[90px] mt-5`}></div>
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={() => {setViewAvatars(false)}} className='bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded mt-4 shadow-md drop-shadow-md'>
                Select
            </button>
        </div> 
    )
}

export default AvatarSelection;