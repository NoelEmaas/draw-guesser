import './App.css';
import { SocketProvider } from './providers/SocketProvider';
import { useState } from 'react';

import StartPage from './pages/Start';
import GamePage from './pages/Game';

const App = () => {
  const [username, setUsername] = useState('');
  const [startGame, setStartGame] = useState(false);

  return (
    <SocketProvider>
      {
        startGame ? (
          <GamePage />
        ) : (
          <StartPage 
            username={username} 
            setUsername={setUsername}
            setStartGame={setStartGame}
          />
        )
      }
    </SocketProvider>
  );
}

export default App;
