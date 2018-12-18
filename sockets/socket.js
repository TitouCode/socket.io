const fs = require('fs');
const path = require('path');

class SocketLoader {
    
    constructor (io = null) {
        this.io = io;
    }

    /**
     * Load modules dynamicly from modules directory. Parse each file to get listeners functions. If function already exists, throw error.
     * @return {array} modules Array with all modules loaded
     */
    loadModules () {
        const pathTo = path.join(__dirname, 'modules');
        const files = fs.readdirSync(pathTo);
        const funcs = files.reduce((a,f) => {
            const fns = require(path.join(pathTo, f));
            const properties = Object.keys(a);
            Object.keys(fns).forEach(fn => {
                if (properties.indexOf(fn) > -1) {
                    const error = `DUPLICATE_KEY: Property ${fn} in ${f}, already exists`;
                    throw new Error(error);
                }
            });
            return a = Object.assign(fns,a);
        }, {});
        return funcs;
    }

    /**
     * Load all sockets events to dispatch
     */
    loadSockets () {
        const funcs = this.loadModules();
        this.io.on('connection', (socket) => {
            console.log('Socket Connected');
            const keys = Object.keys(funcs);
            for (let k = 0; k < keys.length; k++) {
                const key = keys[k];
                socket.on(key, (data) => funcs[key](socket, data));
            }
        });
    }
}

module.exports = SocketLoader;