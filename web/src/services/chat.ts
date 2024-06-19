import axios from 'axios';
import { authorizedBackendApiInstance } from './axios';


export const sendTextMessage = (chatId, text) => {
  return authorizedBackendApiInstance.post(`/chats/${chatId}/sendText`, { text });
};

export const fetchChat = (chatId) => {
console.log('trying to fetch chat')
  return authorizedBackendApiInstance.get(`/chats/${chatId}`);
};

export const sendFileMessage = (chatId, file) => {
  const formData = new FormData();
  formData.append('file', file);

  return authorizedBackendApiInstance.post(`/chats/${chatId}/sendFile`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};