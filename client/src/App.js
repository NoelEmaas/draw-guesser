import './App.css';
import { SocketProvider } from './providers/SocketProvider';
import { useEffect, useState } from 'react';

import StartPage from './pages/Start';
import GamePage from './pages/Game';
import Lobby from './pages/Lobby';

const App = () => {
  const [username, setUsername] = useState('');
  const [join, setJoin] = useState(false);
  const [startGame, setStartGame] = useState(false);

  return (
    <SocketProvider>
      {join ? (
        <Lobby setStartGame={setStartGame} setJoin={setJoin}/>
      ) : startGame ? (
        <GamePage />
      ) : (
        <StartPage 
          username={username} 
          setUsername={setUsername}
          setJoin={setJoin}
        />
      )}
    </SocketProvider>
  );
}

export default App;
