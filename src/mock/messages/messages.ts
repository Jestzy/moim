import { Message } from '../../models/messages/message';
import { USER_LIST } from '../users/profile';

const userList = USER_LIST;

const messageList: Message[] = [];

// userList.forEach(user => {
//     messageList.push({user : user, date : new Date(), lastMessage: "Hello "})
//     messageList.push({user : user, date : new Date(), lastMessage: "Hello  I"})
//     messageList.push({user : user, date : new Date(), lastMessage: "Hello  I"})
// })

export const MESSAGE_LIST = messageList;