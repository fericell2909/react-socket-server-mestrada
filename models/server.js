const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Htpp Server
        this.server = http.createServer(this.app);

        // Configuracion socket
        this.io = socketio(this.server),{/*coniguracion del socket server*/};
    
    }

    middlewares() {

        this.app.use(express.static(path.resolve(__dirname,'../public')))
    }

    configurarSockets () {
        new Sockets(this.io);
    }

    execute() {

        this.middlewares();
        this.configurarSockets();
        this.server.listen(this.port, () => {
            console.log('server corriendo en '+this.port+' ==> ')
        })
    }
}

module.exports = Server;