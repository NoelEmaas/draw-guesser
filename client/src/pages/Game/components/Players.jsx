

const Players = ({ players, drawer }) => {
    return (
        <div className="flex flex-col border h-screen">
            {Object.keys(players).map(player => (
                <div className='border-2 w-full border-[#002043] bg-[#FFBF00] font-bold px-4 py-2' key={players[player].id}>
                    {players[player].id === drawer.id ? 'drawer - ' : ''}
                    {players[player].name}
                    {` - ${players[player].score}`}
                </div>
            ))}
        </div>
    )
}

export default Players;