import React, { createContext, useState } from 'react';
import net from 'net';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [socketData, setSocketData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [players, setPlayers] = useState({});
  const [drawer, setDrawer] = useState(null);
  const [word, setWord] = useState(null);

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
      const indexToCut = jsonString.indexOf('}{');

      if (indexToCut !== -1) {
        const potentialJsonSegments = jsonString.split('}{');
      
        for (let i = 0; i < potentialJsonSegments.length; i++) {
          let segment = potentialJsonSegments[i];

          if (i < potentialJsonSegments.length - 1) {
            segment += '}';
          }

          if (i > 0) {
            segment = '{' + segment;
          }
          
          const parsedData = JSON.parse(segment);
          if (parsedData.action === 'get_id') {
            setUserId(parsedData.payload.id);
            continue;
          }

          if (parsedData.action === 'next') {
            setDrawer(parsedData.payload.drawer);
            continue;
          }

          if (parsedData.action === 'set_word') {
            setWord(parsedData.payload.word);
            continue;
          }

          if (parsedData.action === 'score') {
            setPlayers(parsedData.payload.players);
            continue;
          }
          
          setSocketData(JSON.parse(segment));
        }
      } else {
        const parsedData = JSON.parse(jsonString);
        if (parsedData.action === 'get_id') {
          setUserId(parsedData.payload.id);
          return;
        }

        if (parsedData.action === 'next') {
          console.log(parsedData.payload);
          setDrawer(parsedData.payload.drawer);
          return;
        }

        if (parsedData.action === 'set_word') {
          setWord(parsedData.payload.word);
          return;
        }

        if (parsedData.action === 'score') {
          setPlayers(parsedData.payload.players);
          return;
        }

        setSocketData(JSON.parse(jsonString));
      }
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
    <SocketContext.Provider value={{ socket, socketData,  userId, players, drawer, word, setWord, setPlayers, connectToServer, sendData }}>
      {children}
    </SocketContext.Provider>
  );
};