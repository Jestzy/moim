import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, ModalOptions } from 'ionic-angular';
import { MESSAGE_LIST} from '../../mock/messages/messages';
import { Message } from  '../../models/messages/message';
import { DataService } from '../../providers/data/data.service';
import { Profile } from '../../models/user/profile';
import { AuthService } from '../../providers/auth.service';
import { User } from 'firebase/app';
import "rxjs/add/operator/map";
import { ChatService } from '../../providers/chat/chat.service';
import { Observable, Subscription } from 'rxjs';
import { NgForOf } from '@angular/common';
import { iterateListLike } from '@angular/core/src/change_detection/change_detection_util';
import { LastMessage } from '../../models/last-message';
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage implements OnInit {
 subscription: Subscription;
  messageList$:Observable<Message[]>;
  lastMessages$: Message[];
  lastMessages: LastMessage[];
  userId: string;
  ngOnInit(){
    // this.chat.getLastMessageForUser().subscribe(console.log);
    this.getOnlineUsers();
    this.auth.getAuthenticatedUser().subscribe(user => {
      if(user == null || user == undefined){
        this.subscription.unsubscribe();
      }
      else{
     this.subscription = this.chat.getLastMessageForUser().subscribe(lastMessages => {
      this.lastMessages$ = lastMessages;
      this.lastMessages = [];
      // this.auth.getAuthenticatedUser().subscribe(user => {
        this.userId = user.uid;
        this.lastMessages$.forEach((eachLastMessage) => {
          if (eachLastMessage.userFromId === this.userId) { // current user has sent the last message
            this.lastMessages.push({
              otherUserFirstName: eachLastMessage.userToProfile.name,
              otherUserAvatar: eachLastMessage.userToProfile.avatar,
              otherUserKey: eachLastMessage.userToId,
              content: eachLastMessage.content
            });
          } else { // current user has received the last message
            this.lastMessages.push({
              otherUserFirstName: eachLastMessage.userFromProfile.name,
              otherUserAvatar: eachLastMessage.userFromProfile.avatar,
              otherUserKey: eachLastMessage.userFromId,
              content: eachLastMessage.content
            });
          }
        })
        console.log(this.lastMessages);
      });
    }

    });
  }
//  messageList = MESSAGE_LIST;
 userProfile: Profile;
//  private authenticatedUser$: Subscription;
 private authenticatedUser: User;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private data: DataService,
    private chat: ChatService,
    private modal: ModalController,
    private auth: AuthService) {
    // console.log(this.messageList);
    // this.messageList$ =  this.chat.getLastMessageForUser();
    // this.auth.getAuthenticatedUser().subscribe((user:User) => {
    //   if(user)
    //   {
    //     // this.chat.getLastMessageForUser().subscribe();
    //   this.authenticatedUser = user;
    //   this.data.getProfile(user).subscribe((profile: Profile)=>{
    //      profile.key = user.uid;
    //     this.userProfile = <Profile>profile;
    //       // this.userProfile.$key = user.uid;
          
    //       console.log(this.userProfile,'user');
    //       this.data.setUserOnline(profile);
    //       })
    // this.data.getAuthenticatedUserProfile().subscribe((profile: Profile)=>{
    //     }
    
    // }

    // )
    this.auth.getAuthenticatedUser().subscribe(user => {
      if(user == null || user == undefined){
        console.log('aaa');
        this.subscription.unsubscribe();
        stop();
      }
      else{
     this.subscription = this.chat.getLastMessageForUser().subscribe(lastMessages => {
      this.lastMessages$ = lastMessages;
      this.lastMessages = [];
      // this.auth.getAuthenticatedUser().subscribe(user => {
        this.userId = user.uid;
        this.lastMessages$.forEach((eachLastMessage) => {
          if (eachLastMessage.userFromId === this.userId) { // current user has sent the last message
            this.lastMessages.push({
              otherUserFirstName: eachLastMessage.userToProfile.name,
              otherUserAvatar: eachLastMessage.userToProfile.avatar,
              otherUserKey: eachLastMessage.userToId,
              content: eachLastMessage.content
            });
          } else { // current user has received the last message
            this.lastMessages.push({
              otherUserFirstName: eachLastMessage.userFromProfile.name,
              otherUserAvatar: eachLastMessage.userFromProfile.avatar,
              otherUserKey: eachLastMessage.userFromId,
              content: eachLastMessage.content
            });
          }
        })
        console.log(this.lastMessages);
      });
    }

    });
    
  }
  // setUserOnline(){
  //   // Get Authenticated User
  //    this.auth.getAuthenticatedUser().subscribe((user:User) => {
  //     this.authenticatedUser = user;
  //     this.data.getProfile(user).subscribe((profile: Profile)=>{
  //        profile.key = user.uid;
  //        this.userProfile = <Profile>profile;
  //         // this.userProfile.$key = user.uid;
      
  //         console.log(this.userProfile);
  //         this.data.setUserOnline(profile);
  //       })
  //   // this.data.getAuthenticatedUserProfile().subscribe((profile: Profile)=>{
      
    
  //   }

  //   )
  // }


  ionViewDidLoad() {
    // console.log(this.messageList);
    // console.log('ionViewDidLoad ChatPage');
    // console.log(this.messageList$);
    // let a  =this.messageList$.subscribe();
    // console.log(a);
  }
  gotoChat(uid: any){
   
    this.navCtrl.push('Chat1to1Page',{uid});
  }
  viewProfile(id){
    const mymodalOptions: ModalOptions ={
      enableBackdropDismiss: false

    }
    const mymodal = this.modal.create('ViewProfilePage',{id}, mymodalOptions);
    mymodal.present();
  }
  onlineUsers: Profile[]=[];
  // onlineUsers:[];
  online: any;
  getOnlineUsers(){
    this.data.getOnlineUsersList().subscribe((onlineUsers) => {
      this.onlineUsers =[];
      this.online= [];
      onlineUsers.forEach((eachOnlineUser) => {
        this.onlineUsers.push({
          name: eachOnlineUser.payload.val().name,
          avatar: eachOnlineUser.payload.val().avatar,
          email: eachOnlineUser.payload.val().email,
          dateOfBirth: eachOnlineUser.payload.val().dateOfBirth,
          aboutme : eachOnlineUser.payload.val().aboutme,
          gender: eachOnlineUser.payload.val().gender,
          key: eachOnlineUser.key
        });
       let  key = eachOnlineUser.key;
        this.online.push(key);

      })
      console.log( this.onlineUsers,'online user');
      console.log( this.online,'online');
    })
    // console.log( this.onlineUsers,'online user');
  }
  doesExist(animal): boolean {
  return this.online.includes(animal);
}


}
