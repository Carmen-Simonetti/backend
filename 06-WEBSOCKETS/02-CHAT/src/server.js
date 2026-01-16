import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import viewsRouter from './routes/views.router.js';
import path from 'path'
import { msgManager } from './managers/messages.manager.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/', express.static(path.join(process.cwd(), "public")));

app.engine('handlebars', handlebars.engine()); 
app.set('view engine', 'handlebars');  
app.set('views', path.join(process.cwd(), "views"));  

app.use('/chat', viewsRouter);

const httpServer = app.listen(8080, ()=>{
    console.log('🚀 Server listening on port 8080');
});

const socketServer = new Server(httpServer);

socketServer.on('connection', async(socket)=>{
    console.log('Nuevo cliente conectado', socket.id);

    socketServer.emit('messages', await msgManager.getAll())    //se envia a todos los clientes

    socket.on('new-user', (user)=>{
        socket.broadcast.emit('new-user', user) //se envia a todos los clientes menos al que lo emitio
    })

    socket.on('chat:message', async(msg)=>{ //escucho el evento chat 
        await msgManager.create(msg); //llamo al método de el msg manager metodo create y le paso el objeto
        socketServer.emit('messages', await msgManager.getAll()) //emito a todos la lista de mensajes osea actualizo la lista de msjs o sea va a pasar lo q está en index, escucha la lista de msj y mapea si hay msj nuevo
    })

    socket.on('chat:typing', (data)=>{ //escucho el evento chat:typing RECIBO Y VUELVO A ENVIAR
        socket.broadcast.emit('chat:typing', data) //para q el usuario que está escribiendo el msj no vea ÉL lo que escribe sino para q lo vean los demás
    })
})