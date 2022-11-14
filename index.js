const http=require('http');
const path= require('path')
const express= require('express');
const app= express();
const SocketIO=require('socket.io');
const servidor= http.createServer(app);

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname,'public')));

const server=servidor.listen(app.get('port'),()=>{
    console.log('servidor en el puerto',app.get('port'));
});


const io=SocketIO(server);
io.on('connection',(socket)=>{
    console.log('nueva conexión',socket.id);

    socket.on('chat:mensaje',(data)=>{
        io.sockets.emit('chat:mensaje',data);
    })

    socket.on('chat:escribiendo',(usuario)=>{
        io.sockets.emit('chat:escribiendo',usuario);
    })
});

