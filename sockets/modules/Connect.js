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
    disconnect (socket) {
        console.log('Disconnected');
    }
}