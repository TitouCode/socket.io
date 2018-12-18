const app = require('express')();

const { URL, HOST, SERVER_PORT } = require('./locale');
const Socket = require('./sockets/socket');

console.log(`Server started, visit url: http://${HOST}:${SERVER_PORT}`);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', URL);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const server = require('http').Server(app);
const io = require('socket.io')(server);

// create a local storage
const storage = require('node-persist');
storage.init();
storage.clear();

const socket = new Socket(io);
socket.loadSockets();

server.listen(SERVER_PORT);
