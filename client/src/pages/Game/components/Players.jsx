import Pencil from '../../../assets/pencil.png'
import { Avatars } from '../../../lib/utils';

const Players = ({ players, drawer }) => {
    return (
        <div className="flex flex-col h-screen w-[250px] p-2">
            <div className="flex flex-col w-full h-full p-4 bg-white border rounded-lg gap-y-4">
                {Object.keys(players).map(player => (
                    <div className='flex items-center justify-between w-full' key={players[player].id}>
                        <div className='flex items-center gap-x-2'>
                            <img src={Avatars[players[player].avatar]} alt='avatar' width={40}/>
                            <div className="flex flex-col">
                                <p className="font-bold">
                                    {players[player].name}
                                    {
                                        players[player].correct && ' ✅'
                                    }
                                </p>
                                <p className='text-sm text-slate-500'>{players[player].score} points</p>
                            </div>
                        </div>
                        {drawer.id === players[player].id && 
                            <img src={Pencil} alt="draw-icon" width={25}/>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Players;