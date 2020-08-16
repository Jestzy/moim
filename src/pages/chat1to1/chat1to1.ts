import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ModalOptions} from 'ionic-angular';
import { Message } from '../../models/messages/message';
import { MESSAGE_LIST } from '../../mock/messages/messages';
import { AuthService } from '../../providers/auth.service';
import { ChatService } from '../../providers/chat/chat.service';
import { Observable } from 'rxjs';
import { User } from 'firebase/app';
import { Profile } from '../../models/user/profile';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { DataService } from '../../providers/data/data.service';
// import { Message } from '@angular/compiler/src/i18n/i18n_ast';
// import { Profile } from '../../models/'
/**
 * Generated class for the Chat1to1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat1to1',
  templateUrl: 'chat1to1.html',
})
export class Chat1to1Page {

  chatMessage: Message;
  // @Input() chatIndex: number;
  @Input() userId: string;
  a: string;
  selectedProfile: string;
  // chatMessage: chatMessage;
  messageList: Observable<Message[]>;
 userProfile: Profile;
 user2Profile: Profile;
  constructor(public navCtrl: NavController,
    private Auth: AuthService,
    private chat: ChatService,
    private data: DataService,
    private db: AngularFireDatabase,
    private modal: ModalController,
     public navParams: NavParams) {
    // this.messageList = MESSAGE_LIST
    this.selectedProfile = this.navParams.get('uid');
    this.messageList = this.chat.getChat(this.selectedProfile);
  
    // this.Auth.getAuthenticatedUser().subscribe(auth => {
    //   console.log(auth.uid);
    //   if(auth.uid)
    //   {this.userId = auth.uid;}
    //   else{
    //     console.error();
    //   }
    
    // })
    
    this.Auth.getAuthenticatedUser().subscribe((user:User) => {
      if(user){
        this.userId = user.uid;
        { this.data.getProfile(user).subscribe((profile: Profile)=>{
          this.userProfile = <Profile>profile;
          console.log(this.userProfile.name);
        }
          )}
      }

    })
    
    

  //   this.data.getAuthenticatedUserProfile().subscribe((profile: Profile)=>{
  //     this.userProfile = <Profile>profile;
     
  //     console.log(this.userProfile.name);
  //     // this.userProfile = profile;
  //     // console.log(this.userProfile);
      
  // });
   this.data.getProfileById(this.selectedProfile).subscribe((profile: Profile)=>{
    this.user2Profile = <Profile>profile;
    console.log(this.user2Profile);
    
});
   
     
   
    // return this.profileObject.valueChanges();
    // this.profileObject.
    // console.log(this.profileObject);
  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad Chat1to1Page');
    // this.selectedProfile = this.navParams.get('uid');
    // this.Auth.getAuthenticatedUser().subscribe(auth => this.userId = auth.uid)
    // this.messageList = this.chat.getChat(this.selectedProfile);
  }

  async sendMessage(content: string){
    try{
      const message: Message ={
        userToId: this.selectedProfile,
        userToProfile: {
          name:this.user2Profile.name,
          avatar: this.user2Profile.avatar
        },
        content: content,
        userFromId: this.userId,
        userFromProfile: {
          name:this.userProfile.name,
          avatar: this.userProfile.avatar
        }

      }
      console.log(message);
      await this.chat.sendChat(message);
      this.a = '';
    }
    catch(e){
      console.log(e);
    }
  }
 
    viewProfile(id){
      const mymodalOptions: ModalOptions ={
        enableBackdropDismiss: false
  
      }
      const mymodal = this.modal.create('ViewProfilePage',{id}, mymodalOptions);
  
      mymodal.present();
    
  }
  

}
