import Pencil from '../../../assets/pencil.png'
import { Avatars } from '../../../lib/utils';
import PlayersLabel from '../../../assets/players.png';



const Players = ({ players, drawer }) => {

    return (
        <div className="flex flex-col h-screen w-[280px]">
            <div className="flex flex-col items-center w-full h-full p-4 bg-white gap-y-4 border-[#043173] border-r-2">
                {/* <h1 className='font-bold text-lg mb-2 text-slate-700 w-full text-center'>Players</h1> */}
                <img src={PlayersLabel} alt="players" width={140}/>
                {Object.keys(players).map(player => (
                    <div className='flex items-center justify-between w-full' key={players[player].id}>
                        <div className='flex items-center gap-x-3'>
                            <img src={Avatars[players[player].avatar]} alt='avatar' width={40}/>
                            <div className="flex flex-col">
                                <p className="font-bold text-slate-700">
                                    {players[player].name}
                                    {
                                        players[player].correct && ' ✅'
                                    }
                                </p>
                                <p className='text-xs text-slate-500'>{players[player].score} points</p>
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