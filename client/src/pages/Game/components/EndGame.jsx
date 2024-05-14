

const EndGame = ({ players }) => {
    console.log(players);
    return (
        <div className="bg-white rounded-lg w-[500px] h-[500px] border flex flex-col items-center">
            <h1 className="text-blue-500 text-xl font-bold mt-4">Game Over!</h1>
            <h4 className="text-xl font-bold mb-4">Final Scores:</h4>
            <div className="bg-white border rounded-lg w-full h-full flex flex-col gap-y-4 p-4">
                {Object.keys(players).map((player, index) => (
                    <div className='w-full flex items-center justify-between' key={players[player].id}>
                        <div className="flex flex-col">
                            <p className="font-bold">
                                {players[player].name}
                            </p>
                            <p className='text-sm text-slate-500'>{players[player].score} points</p>
                        </div>
                        {/* display number here */}
                        <p>#{index + 1}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EndGame;