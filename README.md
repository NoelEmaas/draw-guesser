# Draw Guesser
Multiplayer Draw Guessing Game using Sockets. Built using Electron, React, Net library.

# Setup
```
git clone https://github.com/NoelEmaas/draw-guesser.git
cd draw-guesser
```

Note: Replace the value of ```SERVER IP ADDRESS``` in the following files:
- client/src/providers/SocketProvider.jsx
- server/server.js

Run server:
```
cd server
npm start
```

Run client:
```
cd client
npm install
npm run build
npm start
```



# Preview

| Main Menu |
|----------|
|![plot](./assets/main_menu.png)|

| Avatar Selection |
|----------|
|![plot](./assets/avatar_selection.png)|

| Lobby |
|----------|
|![plot](./assets/lobby.png)|

| Main Game |
|----------|
|![plot](./assets/main_game.png)|

| Word Reveal (Every End of Turn) |
|----------|
|![plot](./assets/word_reveal.png)|

| Final Scores |
|----------|
|![plot](./assets/final_scores.png)|

# Credits
I do not own some of the assets in this game such as the avatars and the background pattern. It was taken from [gartic.io](https://gartic.io/), which is also an online draw guessing game. Credits to them.
