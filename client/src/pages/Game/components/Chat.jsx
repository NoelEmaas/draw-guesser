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
        <div className="w-[200px]">
            <p>Word: {word}</p>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className="chat-message">
                        <span className="chat-sender">{msg.sender}</span>
                        <span className={`chat-text ${msg.correct ? 'text-green-700' : 'text-black'}`}>
                            {
                                msg.correct ? (
                                    <span className="font-bold">guessed the word!</span>
                                ) : (
                                    <span>{msg.message}</span>
                                )
                            }
                        </span>
                    </div>
                ))}
            </div>
            <div className="chat-input-container">
                <input
                    disabled={!canChat || guessed}
                    type="text"
                    className="border"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            handleSendMessage();
                        }
                    }}
                />
                <button className="chat-send" onClick={handleSendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;