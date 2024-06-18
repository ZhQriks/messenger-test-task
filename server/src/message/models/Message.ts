import mongoose, { Document, Schema } from 'mongoose';

interface IMessage extends Document {
  username: string;
  text: string;
  socketID: string;
  createdAt: Date;
  senderId: string;
  receiverId: string;
  read: Boolean;
}

const MessageSchema = new Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
  socketID: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  read: { type: Boolean, default: false }
});

const Message = mongoose.model<IMessage>('Message', MessageSchema);

export default Message;
