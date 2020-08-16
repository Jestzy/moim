import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ModalOptions, PopoverController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AngularFireDatabase} from 'angularfire2/database';
import { DataService } from '../../providers/data/data.service';
import { Profile } from '../../models/user/profile';
import { AuthService } from '../../providers/auth.service';
import { User } from 'firebase/app';
import { Observable } from 'rxjs';
import { Vibration } from '@ionic-native/vibration';
declare var google;
/**
/**
 * Generated class for the EventViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-view',
  templateUrl: 'event-view.html',
})
export class EventViewPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers: any;
  position : any;
  event:any;
  date:any;
  userProfile: Profile;
  eventkey: any;
  myuid :any;
  list: Observable<any[]>;
  count$:Observable<number>;
  count: any;
  blank: string;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
     private db: AngularFireDatabase,
     private data: DataService,
     private auth: AuthService,
     private vibrate: Vibration,
     private modal: ModalController,
     private popoverCtrl : PopoverController,
     public alertCtrl: AlertController){
   this.event = this.navParams.get('id');
   this.blank = ' ';
   console.log(this.event);
   if(this.event === undefined){
     this.navCtrl.push(TabsPage);
   }
   this.date = new Date().toDateString().split(" ")[1]+" "+[2]+[3];
   this.auth.getAuthenticatedUser().subscribe((user:User) => {
    if(user)
   { this.myuid = user.uid;}
  })
   this.data.getAuthenticatedUserProfile().subscribe((profile: Profile)=>{
    this.userProfile = <Profile>profile;
    console.log(this.userProfile);
  }
);
}

  ionViewWillLoad() {
   
    if(this.event != undefined){
      this.loadMap();
    }else{
      this.navCtrl.push(TabsPage);
    }
 
  }
  viewProfile(id){
    const mymodalOptions: ModalOptions ={
      enableBackdropDismiss: false
    }
    const mymodal = this.modal.create('ViewProfilePage',{id}, mymodalOptions);
    mymodal.present();
  }

  gotoChat(uid){
    this.navCtrl.push('Chat1to1Page',{uid});
  }

  eventWhoJoin: Observable<any[]>;
  countWhojoin: any;

  OpenChat(uid,key,event){
    console.log(key);
    console.log(event.keyid);
    this.list =  this.db.list(`event-love/${this.myuid}/`, ref=> ref.orderByChild('keyid').equalTo(event.keyid)).valueChanges();
    this.count$ = this.list.map(ref=>
      ref.length);
      this.count = this.count$.subscribe( a=>{
        if(a === 0){
          this.db.list(`event-love/${this.myuid}/`).push(event);
      }else{
        console.log(a);
      }});
      this.eventWhoJoin =  this.db.list(`event-who-love/${event.keyid}/`, ref=> ref.orderByChild('useId').equalTo(this.myuid)).valueChanges();
      this.countWhojoin =this.eventWhoJoin.map(ref=>
        ref.length).subscribe( b=>{
          if(b === 0){
            this.db.list(`event-who-love/${event.keyid}/`).push(this.myuid);
        }else{
          console.log(b);
        }});
     
    let alert = this.alertCtrl.create({
      title:' You moim this event',
      message: 'Do you want to chat with your friend now?',
      buttons: [
        {
          text:'Nope',
          role: 'cancel',
          handler : ()=>{
            console.log('cancle click');
          }
        },
        {
          text:'Chat Now',
          handler :()=>{
            this.navCtrl.push('Chat1to1Page',{uid});
          }
        }
      ]
    });
    this.vibrate.vibrate(1000);
    alert.present();
  }

  loadMap(){
   
    this.position = new google.maps.LatLng(this.event.map[0], this.event.map[1]);
    // this.latLong = [7.006067, 100.498763];
    let mapOptions = {
      center:  this.position,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      streetViewControl: false,
      mapTypeControl: false,
      // styles: [
      //   {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      //   {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      //   {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      //   {
      //     featureType: 'administrative.locality',
      //     elementType: 'labels.text.fill',
      //     stylers: [{color: '#d59563'}]
      //   },
      //   {
      //     featureType: 'poi',
      //     elementType: 'labels.text.fill',
      //     stylers: [{color: '#d59563'}]
      //   },
      //   {
      //     featureType: 'poi.park',
      //     elementType: 'geometry',
      //     stylers: [{color: '#263c3f'}]
      //   },
      //   {
      //     featureType: 'poi.park',
      //     elementType: 'labels.text.fill',
      //     stylers: [{color: '#6b9a76'}]
      //   },
      //   {
      //     featureType: 'road',
      //     elementType: 'geometry',
      //     stylers: [{color: '#38414e'}]
      //   },
      //   {
      //     featureType: 'road',
      //     elementType: 'geometry.stroke',
      //     stylers: [{color: '#212a37'}]
      //   },
      //   {
      //     featureType: 'road',
      //     elementType: 'labels.text.fill',
      //     stylers: [{color: '#9ca5b3'}]
      //   },
      //   {
      //     featureType: 'road.highway',
      //     elementType: 'geometry',
      //     stylers: [{color: '#746855'}]
      //   },
      //   {
      //     featureType: 'road.highway',
      //     elementType: 'geometry.stroke',
      //     stylers: [{color: '#1f2835'}]
      //   },
      //   {
      //     featureType: 'road.highway',
      //     elementType: 'labels.text.fill',
      //     stylers: [{color: '#f3d19c'}]
      //   },
      //   {
      //     featureType: 'transit',
      //     elementType: 'geometry',
      //     stylers: [{color: '#2f3948'}]
      //   },
      //   {
      //     featureType: 'transit.station',
      //     elementType: 'labels.text.fill',
      //     stylers: [{color: '#d59563'}]
      //   },
      //   {
      //     featureType: 'water',
      //     elementType: 'geometry',
      //     stylers: [{color: '#17263c'}]
      //   },
      //   {
      //     featureType: 'water',
      //     elementType: 'labels.text.fill',
      //     stylers: [{color: '#515c6d'}]
      //   },
      //   {
      //     featureType: 'water',
      //     elementType: 'labels.text.stroke',
      //     stylers: [{color: '#17263c'}]
      //   }
      // ]
    }
    console.log(mapOptions);
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.map.setCenter(this.position);
    var icon = {
      url: '../../assets/imgs/anchor-01.png', // url
      scaledSize: new google.maps.Size(40, 40), // scaled size
      // origin: new google.maps.Point(0,0), // origin
      // anchor: new google.maps.Point(0, 0) // anchor
  };
    var marker = new google.maps.Marker({position: this.position, map: this.map,icon: icon});
  
  }

  do(){
    this.map.setCenter(this.position);
  }
  eventList: Observable<any[]>;
 
  delete(id){
    let alert = this.alertCtrl.create({
      title:' Delete this',
      message: 'Do you want to delete this event now?',
      buttons: [
        {
          text:'Cancel',
          role: 'cancel',
          handler : ()=>{
            console.log('cancle click');
          }
        },
        {
          text:'Delete',
          handler :()=>{
          this.db.database.ref(`/event-list/`).orderByChild('keyid').equalTo(id).on('child_added', (snapshot) => {
            snapshot.ref.remove();
          });
          this.db.database.ref(`/event-love/`).orderByChild('keyid').equalTo(id).on('child_added', (snapshot) => {
            snapshot.ref.remove();
          });
          this.navCtrl.push(TabsPage);
          }
        }
      ]
    });
    this.vibrate.vibrate(1000);
    alert.present();
  }
  // result : Profile[];
  // ownerProfile:Profile;
  viewWholove(keyid){
  //   this.db.list(`event-who-love/${keyid}/`).valueChanges().subscribe(ref => {
  //   this.result = [];
  //   for(let key in ref) {
  //     console.log(ref[key]);
  //     let id = ref[key];
  //     this.data.getProfileById(id).subscribe((profile: Profile)=>{
  //       this.ownerProfile = <Profile>profile;
      
  //        this.result.push(this.ownerProfile);
  //       console.log(this.ownerProfile);
  //       console.log(this.result);    
  //     })
  //   }
  
  // })
  //   let profile = this.result;
  this.navCtrl.push('ProfilePage',{keyid});
  

}

more(id){
  const popover = this.popoverCtrl.create('SignUpSuccessPage',{id},{cssClass: 'custom-popover'});
 
    popover.present();
}
deletelove(id){
  let alert = this.alertCtrl.create({
    title:' Not interested',
    message: "You don't want to join this event anymore",
    buttons: [
      {
        text:'No',
        role: 'cancel',
        handler : ()=>{
          console.log('cancle click');
        }
      },
      {
        text:'Yes',
        handler :()=>{
        this.db.database.ref(`/event-love/${this.myuid}`).orderByChild('keyid').equalTo(id).on('child_added', (snapshot) => {
          snapshot.ref.remove();
        });
        this.navCtrl.push(TabsPage);
        }
      }
    ]
  });
  this.vibrate.vibrate(1000);
  alert.present();
}


 
  

}
