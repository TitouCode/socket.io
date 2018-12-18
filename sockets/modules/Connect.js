const storage = require('node-persist');

module.exports = {
    /**
     * Connect event listenner
     * @param {object} socket Socket Object
     */
    connect (socket) {
        // logic
    },    
    /**
     * Disconnect event listenner
     * @param {object} socket Socket Object
     */
    async disconnect (socket) {
        const users = await storage.getItem('users');
        if (!users) return false;
        const id = users[socket.id];
        socket.broadcast.emit('userDisconnect', {
            user: {
                id 
            }
        });
        delete users[socket.id];
        await storage.setItem('users', users);
    }
}