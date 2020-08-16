import { Profile } from '../../models/user/profile';

const userList: Profile[] = [
    {name: 'Paul', avatar: 'asset/img/avartar.png',email : 'paul@paul.com', dateOfBirth : new Date(), aboutme: "Hi,nice to meet you", gender: "male"},
    {name: 'Hally', avatar: 'asset/img/avartar.png',email : 'hally@paul.com', dateOfBirth : new Date(), aboutme: "Hi,nice to meet you", gender: "male"},
    {name: 'sarah', avatar: 'asset/img/avartar.png',email : 'Sarah@paul.com', dateOfBirth : new Date(), aboutme: "Hi,nice to meet you", gender: "male"}
 ];
 

 export const USER_LIST = userList;