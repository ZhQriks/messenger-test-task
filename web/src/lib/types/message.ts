export interface IMessage {
  _id: string;
  user: string;
  text: string;
  createdAt: string;
  isSentByCurrentUser: boolean;
  socketID?: string;
  receiverId?: string;
  username: string;
  senderId?: string;
}