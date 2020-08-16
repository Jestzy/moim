import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading,LoadingController, AlertController, Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';
import {AngularFireList, AngularFireDatabase} from 'angularfire2/database';
import { EventItem } from '../../models/event-item.interface';
import { AuthService } from '../../providers/auth.service';
import { Profile } from '../../models/user/profile';
import { User } from 'firebase/app';
import { DataService } from '../../providers/data/data.service';
import { async } from 'rxjs/internal/scheduler/async';
import { LocalNotifications } from '@ionic-native/local-notifications';

/**
 * Generated class for the EventAllPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-all',
  templateUrl: 'event-all.html',
})
export class EventAllPage implements OnInit{
  
  ngOnInit(){
    this.loader.present();
//  this.auth.getAuthenticatedUser().subscribe((user:User) => {

//       this.authenticatedUser = user;
//    console.log(this.authenticatedUser.uid);
//     })
    this.eventList = this.db.list('event-list', ref=> ref.orderByChild('uid').equalTo(this.authenticatedUser.uid)).valueChanges();
    // this.eventList.
    this.empty$ = this.eventList.map(ref=> ref.length ===0);
    console.log(this.eventList);
    this.eventloveList = this.db.list(`event-love/${this.authenticatedUser.uid}/`).valueChanges();
    this.emptyLove$ = this.eventloveList.map(ref=> ref.length ===0);
    // this.eventloveList = this.db.list('/event-love/',ref=> ref.orderByKey().equalTo(this.authenticatedUser.uid)).valueChanges();
   
    console.log(this.eventloveList);
    this.eventloveList.forEach(item =>{
      // console.log(typeof(item));
      for(let key in item) {
        console.log(item[key]['eventname'])
      }
    })
    this.platform.ready()
    .then(() => {
      this.localNotifications.cancelAll();
      this.eventloveList.forEach(item =>{
        for(let key in item) {
          console.log( item[key]['keyid']);
          console.log( item[key]['timestamp']);
          // console.log( new Date(item[key]['timestamp']));
      this.localNotifications.schedule({
        id: item[key]['keyid'] ,
        title: 'Notification',
        text: 'Now is time to join the event',
        icon: '../../resources/icon.png',
        // at: new Date(),
        trigger: {at:item[key]['timestamp'] },
        data: { secret: 'hellloo' }
      });
    }
    })
   })
  
  }
  eventListRef$: AngularFireList<EventItem>;
  eventList: Observable<any[]>;
  eventloveList: Observable<any[]>;
  empty$:Observable<boolean>;
  emptyLove$:Observable<boolean>;
  userProfile: Profile;
  loader: Loading;
  start:any;
  end:any;
  date: string;
  ss: any;
  today:any;
  private authenticatedUser: User;
event: string = 'myEvents';
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private loadingCtrl: LoadingController,
     private auth: AuthService,
     private data: DataService,
     private localNotifications: LocalNotifications,
     private alertCtrl: AlertController,
     private platform: Platform,
     private db: AngularFireDatabase) {
      this.auth.getAuthenticatedUser().subscribe((user:User) => {
        if(user)
       { 
         this.authenticatedUser = user;
     console.log(this.authenticatedUser.uid);
 
    }
      })
      this.loader = this.loadingCtrl.create({
        spinner: 'hide',
        content: `<img src="../assets/imgs/ellipsis1.svg"/><br>Loading...`,
        duration: 2000,
        
      });
      this.today = new Date().getTime().toString() ;
      console.log(this.today,'today');
       this.start = new Date();
          this.start.setHours(0,0,0,0);
      this.end = new Date();
          this.end.setHours(23,59,59,999);
          console.log( this.start.getTime() + ':' + this.end.getTime());

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventAllPage');
  }

  gotoEventView(eventid){
    this.navCtrl.push('EventViewPage',{id : eventid});
  }
}
