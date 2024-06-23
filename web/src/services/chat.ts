import { IMessage } from '@/lib/types/message';
import { authorizedBackendApiInstance } from './axios';
import { AxiosResponse } from 'axios';

export const fetchMessages = (roomId): Promise<AxiosResponse<IMessage[]>> => {
  return authorizedBackendApiInstance(`/messages/${roomId}`);
};