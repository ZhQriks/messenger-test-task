import { BACKEND_BASE_URL } from '@/shared';
import { io } from 'socket.io-client';

const SOCKET_URL = BACKEND_BASE_URL;

const socket = io(SOCKET_URL, {
  autoConnect: true,
});

export default socket;