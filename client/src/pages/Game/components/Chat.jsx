import { useEffect, useState } from "react";

const Chat = ({ socketData, sendData, player, word, drawer, canChat }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [guessed, setGuessed] = useState(false);

    useEffect(() => {
        if (!socketData) return;

        const { action, payload } = socketData;
        if (action === "message") {
            const { message, sender, correct } = payload;
            setMessages((prevMessages) => [
                ...prevMessages,
                { message, sender, correct },
            ]);
        }
    }, [socketData]);

    const handleSendMessage = () => {
        if (message.trim() === "") return;

        const correctlyGuessed = message.trim().toLowerCase() === word.toLowerCase();
        setGuessed(correctlyGuessed);

        const data = {
            action: "message",
            payload: {
                message: message,
                sender: player.name,
                correct: correctlyGuessed,
                drawerId: drawer.id
            }
        };

        sendData(JSON.stringify(data));
        setMessage("");
    };

    return (
        <div className="w-[350px] p-2 h-screen">
            <div className="bg-white border rounded-lg h-full w-full p-4 relative flex flex-col items-center">
                <div className="chat-messages w-full">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-center gap-x-2 ${msg.correct ? 'text-green-600' : 'text-black'}`}>
                            <p>
                                {
                                    msg.correct ? (
                                        <p className="font-bold">{msg.sender} guessed the word!</p>
                                    ) : (
                                        <p>{msg.sender}: {msg.message}</p>
                                    )
                                }
                            </p>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-center border-2 absolute bottom-1">
                    <input
                        disabled={!canChat || guessed}
                        type="text"
                        className="border-0 border-r py-2 px-2 h-full w-full"
                        value={message}
                        placeholder="What's your guess?"
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                handleSendMessage();
                            }
                        }}
                    />
                    <button className="flex items-center justify-center h-full px-4" onClick={handleSendMessage}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;