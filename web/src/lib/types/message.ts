export interface IMessage {
  user: string;
  text: string;
  createdAt: string;
  isSentByCurrentUser: boolean;
  _id?: string;
  receiverId?: string;
  username: string;
  senderId?: string;
}