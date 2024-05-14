import Pencil from '../../../assets/pencil.png'

const Players = ({ players, drawer }) => {
    return (
        <div className="flex flex-col h-screen w-[250px] p-2">
            <div className="bg-white border rounded-lg w-full h-full flex flex-col gap-y-4 p-4">
                {Object.keys(players).map(player => (
                    <div className='w-full flex items-center justify-between' key={players[player].id}>
                        <div className="flex flex-col">
                            <p className="font-bold">
                                {players[player].name}
                                {
                                    players[player].correct && ' ✅'
                                }
                            </p>
                            <p className='text-sm text-slate-500'>{players[player].score} points</p>
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