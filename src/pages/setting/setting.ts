import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DataService } from '../../providers/data/data.service';
import { AuthService } from '../../providers/auth.service';
import { User } from 'firebase/app';
import { Profile } from '../../models/user/profile';
import { Observable } from 'rxjs';
import {AngularFireList, AngularFireDatabase} from 'angularfire2/database';
import { EventItem } from '../../models/event-item.interface';
import { Vibration } from '@ionic-native/vibration';
import { ChatService } from '../../providers/chat/chat.service';
/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage implements OnInit {

  userProfile : Profile;
  loader: Loading;
  count : any;
  count2 : any;
  count$: Observable<number>;
  eventlove$: Observable<number>;
  cc: any;
  uid:any;
  eventLoveList: Observable<any[]>;
  ngOnInit(): void{
    this.loader.present();
    // this.auth
    this.auth.getAuthenticatedUser().subscribe((user:User) => {
  if(user)
     { this.data.getProfile(user).subscribe((profile: Profile)=>{
        if(!profile){
          this.navCtrl.push('EditProfilePage');
        }
          this.userProfile = <Profile>profile;
          console.log(this.userProfile);
          this.uid = user.uid;
          console.log(user.uid);
          this.eventList = this.db.list('event-list', ref=> ref.orderByChild('uid').equalTo(user.uid)).valueChanges();
          this.count$ = this.eventList.map(ref=>ref.length);
          this.eventLoveList = this.db.list(`event-love/${user.uid}/`).valueChanges();
          this.eventlove$ = this.eventLoveList.map(ref=>ref.length);
          // this.loader.dismiss();
          this.count$.subscribe(a=>{
          if(a === 0){
            this.count = 0
          }else{
            this.count = a;
          }})
          this.eventlove$.subscribe(a=>{
            if(a === 0){
              this.count2 = 0
            }else{
              this.count2 = a;
            }})
          console.log(user.uid);
         
      })}
      this.loader.dismiss();
    })
   
 
  }
  eventList: Observable<any[]>;
  empty$:Observable<boolean>;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private data: DataService,
              private loading: LoadingController,
              private auth: AuthService,
              private chat: ChatService,
              private vibrate: Vibration,
              private db: AngularFireDatabase,
              private alertCtrl: AlertController) {
                this.loader = this.loading.create({
                  content: 'Loading Profile...'
                });
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  logout(){
    let alert = this.alertCtrl.create({
      title:'Remind',
      message: 'Log out now?',
      buttons: [
        {
          text:'Cancel',
          role: 'cancel',
          handler : ()=>{
            console.log('cancle click');
          }
        },
        {
          text:'Confirm',
          handler :()=>{
            // this.db.database.ref(`/online-users/`).orderByKey().equalTo(this.uid).on('child_added', (snapshot) => {
            //   snapshot.ref.remove();
            // });
            this.auth.signout();
            this.navCtrl.push('SlidePage');
          }
        }
      ]
    });
    this.vibrate.vibrate(1000);
    alert.present();
    // this.auth.signout();
    // this.navCtrl.push('HomePage');
    // this.auth.signout();
  }
  gotoEdit(){
    this.navCtrl.push('EditProfilePage',{edit:'edit'});
  }

  gotoAbout(){
    this.navCtrl.push('AboutPage');
  }
  gotoPrivacy(){
    this.navCtrl.push('PrivacyPage');
  }
  gotoReport(){
    this.navCtrl.push('FeedbackPage');
  }
  

}
