import { useEffect, useState } from "react";
import ChatLabel from '../../../assets/chat.png';

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
        <div className="w-[280px] h-screen">
            <div className="bg-white h-full w-full p-4 relative flex flex-col items-center border-[#043173] border-l-2">
                <img src={ChatLabel} alt="players" width={85} className="mt-1"/>
                <div className="chat-messages w-full">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-center gap-x-2 ${msg.correct ? 'text-green-600' : 'text-black'}`}>                 
                            {
                                msg.correct ? (
                                    <p className="font-bold">{msg.sender} guessed the word!</p>
                                ) : (
                                    <p><strong>{msg.sender}</strong>: {msg.message}</p>
                                )
                            }            
                        </div>
                    ))}
                </div>
                <div className="absolute bottom-1 p-4">
                    <div className="w-full h-[45px] flex items-center justify-center rounded-md">
                        <input
                            disabled={!canChat || guessed}
                            type="text"
                            className="border-2 py-2 px-2 h-full w-full rounded-none rounded-l-md text-sm"
                            value={message}
                            placeholder="What's your guess?"
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                    handleSendMessage();
                                }
                            }}
                        />
                        <button className="flex items-center justify-center h-full px-4 bg-blue-500 rounded-none rounded-r-md" onClick={handleSendMessage}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ffffff" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;