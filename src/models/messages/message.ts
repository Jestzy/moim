import { Profile } from "../user/profile";

export interface Message {
    // user: Profile;
    // date: Date;
    // lastMessage: string;
    userFromId: string;
    userFromProfile:{
        name: string;
        avatar: any;
    }
    userToId: string;
    userToProfile:{
        name: string;
        avatar: any;
    }
    content: string;

}