import { IMessage } from '@/lib/types/message';
import { backendApiInstance } from './axios';
import { AxiosResponse } from 'axios';

export const fetchMessages = (roomId): Promise<AxiosResponse<IMessage[]>> => {
  return backendApiInstance(`/messages/${roomId}`);
};