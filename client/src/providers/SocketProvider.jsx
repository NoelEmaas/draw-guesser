import React, { createContext, useState } from 'react';
import net from 'net';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [socketData, setSocketData] = useState(null);

  const connectToServer = () => {
    const newSocket = net.connect({
      port: 1235,
      host: '127.0.0.1',
    });

    newSocket.on('connect', () => {
      console.log('Connected to the server');
    });

    newSocket.on('data', (data) => {
      const jsonString = data.toString('utf8');
      const socketData = JSON.parse(jsonString);
      setSocketData(socketData);
    });

    newSocket.on('timeout', () => {
      newSocket.write('quit');
      newSocket.end();
    });

    newSocket.on('end', () => {
      console.log('Disconnected from the server');
      process.exit();
    });

    newSocket.on('error', (err) => {
      console.log('Error:', err);
    });

    setSocket(newSocket);
  };

  const sendData = (data) => {
    if (socket) {
      socket.write(data);
    }
  };    

  return (
    <SocketContext.Provider value={{ socket, socketData, connectToServer, sendData }}>
      {children}
    </SocketContext.Provider>
  );
};