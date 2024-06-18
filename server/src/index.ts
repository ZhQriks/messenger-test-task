import 'dotenv/config';
import express from 'express';
import connectDB from './db';
import globalRouter from './global-router';
import { logger } from './logger';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import Message from './message/models/Message';

const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

let roomUsers: Record<string, string[]> = {};

connectDB();

app.use(cors({
  origin: 'http://localhost:3001', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.get('/api/v1/messages/:receiverId', async (req, res) => {
  try {
    const messages = await Message.find({ receiverId: req.params.receiverId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const usersOnline = {};

io.on('connection', (socket) => {
  io.emit('users_response', roomUsers);
  console.log('CONNECTED');
  console.log('CONNECTED');

  console.log(`User Connected: ${socket.id}`);

  const userId = socket.handshake.query.userId;
  if (typeof userId === 'string') {
    usersOnline[userId] = true;
    io.emit('user_status', { userId, isOnline: true });

    socket.on('disconnect', () => {
      usersOnline[userId] = false;
      io.emit('user_status', { userId, isOnline: false });
    });
  } else {
    console.error('Invalid userId type:', typeof userId);
  }

  socket.on('join_room', (receiverId: string) => {
    socket.join(receiverId);
  });

  socket.on('send_message', (data) => {
    console.log('Message received:', data);

    if (!data.socketID) {
      data.socketID = socket.id;
    }

    const message = new Message({
      username: data.username,
      text: data.text,
      receiverId: data.receiverId,
      socketID: data.socketID,
      senderId: data.senderId,
    });
    
    

    message.save()
      .then(() => {
        io.to(data.receiverId).emit('receive_message', data);
        console.log('our message',message);
      })
      .catch(err => {
        console.error('Error saving message:', err);
      });
  });

  socket.on('typing', (data) => {
    socket.to(data.receiverId).emit('user_typing', { userId: data.userId });
  });

  socket.on('disconnect', () => {
    if (typeof userId === 'string') {
      usersOnline[userId] = false;
      io.emit('user_status', { userId, isOnline: false });

      for (const receiverId in roomUsers) {
        const index = roomUsers[receiverId].indexOf(socket.id);
        if (index !== -1) {
          roomUsers[receiverId].splice(index, 1);
          if (roomUsers[receiverId].length === 0) {
            delete roomUsers[receiverId];
          }
          io.to(receiverId).emit('receive_message', {
            text: 'A user left the room.',
            socketId: socket.id,
            receiverId: receiverId,
          });
        }
      }
    }
    console.log('User Disconnected ' + socket.id);
  });
});

app.use(logger);
app.use(express.json());
app.use('/api/v1/', globalRouter);

server.listen(PORT, () => {
  console.log(`Server runs at http://localhost:${PORT}`);
});