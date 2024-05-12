import { useEffect, useState } from "react";

const Chat = ({ socketData, sendData }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!socketData) return;

        const { action } = socketData;
        if (action === "message") {
            const { message, sender } = socketData;
            setMessages((prevMessages) => [
                ...prevMessages,
                { message, sender },
            ]);
        }
    }, [socketData]);

    const handleSendMessage = () => {
        if (message.trim() === "") return;
        
        const sender = "You";
        setMessages((prevMessages) => [
            ...prevMessages,
            { message, sender },
        ]);

        const data = {
            action: "message",
            message: message,
            sender: sender,
        };

        sendData(JSON.stringify(data));
        setMessage("");
    };

    return (
        <div className="w-[200px]">
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className="chat-message">
                        <span className="chat-sender">{msg.sender}</span>
                        <span className="chat-text">{msg.message}</span>
                    </div>
                ))}
            </div>
            <div className="chat-input-container">
                <input
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