import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading,LoadingController, ModalOptions, ModalController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';
import {AngularFireList, AngularFireDatabase} from 'angularfire2/database';
import { EventItem } from '../../models/event-item.interface';
import { AuthService } from '../../providers/auth.service';
import { Profile } from '../../models/user/profile';
import { User } from 'firebase/app';
import "rxjs/add/operator/map";
import { DataService } from '../../providers/data/data.service';
import {Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder} from '@ionic-native/native-geocoder';
import { async } from 'rxjs/internal/scheduler/async';
import { PipeTransform, Pipe } from '@angular/core';

// @Pipe({name: 'keys'})
// export class KeysPipe implements PipeTransform {
//   transform(value, args:string[]) : any {
//     let keys = [];
//     for (let key in value) {
//       keys.push({key: key, value: value[key]});
//     }
//     return keys;
//   }
// }

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',

})
export class MainPage implements OnInit{
  // public query: string;
  ngOnInit(){
    
    this.loader.present();
    this.auth.getAuthenticatedUser().subscribe((user:User) => {
      if(user)
      this.setUserOnline();
         { this.data.getProfile(user).subscribe((profile: Profile)=>{
            if(!profile){
              this.navCtrl.push('EditProfilePage');
            }
          }
            )}
          })
    this.eventList = this.db.list('event-list',ref=> ref.orderByChild('timestamp')).valueChanges();
    this.loader.dismiss();
    // this.setUserOnline();
  }
  // eventListRef$: AngularFireList<EventItem>;
  eventListRef$: EventItem[];
   eventList: Observable<any[]>;
    userProfile: Profile;
    loader: Loading;
    date: string;
    position : any;
    query:string;
    today: any;
    private authenticatedUser: User;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
      public toastCtrl: ToastController,
      private loadingCtrl: LoadingController,
      private auth: AuthService,
      private modal: ModalController,
      private data: DataService,
      private geolocation : Geolocation,
      private db: AngularFireDatabase,
      ) {
        this.loader = this.loadingCtrl.create({
          spinner: 'hide',
          content: `<img src="../assets/imgs/ellipsis1.svg"/><br>Loading...`,
          duration: 8000,
          
        });
        this.getGeo();
        this.date = new Date().toDateString().split(" ")[1]+" "+[2]+[3];
       console.log(this.date);
       this.today = new Date().getTime() - 86400000  ;
       console.log(new Date().getTime());
       console.log(this.today,'today');
      //  this.shoppingList = this.db.list('event-list').valueChanges();
        // this.setUserOnline();
    

   
       
        
      }
  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Login successfully!',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
  // reverseGeoCode(lat,long){
  // let a =   this.reverseGeoCoding(lat,long);

  // }

  ionViewWillLoad() {
    // this.presentToast();
    console.log('ionViewDidLoad MainPage');
    
  }

  // this.shoppingList = this.db.list('event-list').valueChanges();
  // const a= query.toString();
  // if(query && query != ''){
    // search(firstName: string): Observable<any[]> {

    //   this.profileList$ = this.db.list('/profiles', (res) => {
    //     return res.orderByChild('firstName').equalTo(firstName);
    //   });
    //   return this.profileList$.snapshotChanges().take(1);
    // } 

  
 

  
  gotoAddEvent(){
  
    console.log(this.position);
   let  f = this.position;
   this.navCtrl.push('AddEventPage',{f});
  }
  getGeo(){
    this.geolocation.getCurrentPosition().then((resp) => {
      let pos = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };
      console.log(pos);
    this.position = pos;
    console.log(this.position);
   

    }).catch((error) => {
      console.log('Error getting location', error);
      // this.loader.dismiss();
    });
  }
  gotoCreateEvent(){
    this.navCtrl.push('CreateEventPage');
  }
  gotoEventView(eventid: any){
    this.navCtrl.push('EventViewPage',{id : eventid});
  }

  setUserOnline(){
    // Get Authenticated User
     this.auth.getAuthenticatedUser().subscribe((user:User) => {

      this.authenticatedUser = user;
      this.data.getProfile(user).subscribe((profile: Profile)=>{
         profile.key = user.uid;
        this.userProfile = <Profile>profile;
          // this.userProfile.$key = user.uid;
          
          console.log(profile);
          this.data.setUserOnline(profile);
          })
    // this.data.getAuthenticatedUserProfile().subscribe((profile: Profile)=>{
      
    
    }

    )
  }
  
  goSelectCategory(){
    this.navCtrl.push('SelectCategoryPage');
  }
  

  search($event) {

    // const trimmedQuery: string = this.query.trim();
  
    // console.log(this.query);
    console.log($event.value);
    // console.log($event);
    let query = $event.value;
    if (query === '') {
      console.log(this.eventList);
      this.eventList = this.db.list('event-list',ref=> ref.orderByChild('timestamp')).valueChanges();
      
    // }
  }
  else{
    this.eventList = this.db.list('event-list',ref=> ref.orderByChild('eventname').startAt(query).endAt(query+"\uf8ff")).valueChanges();
  }
  }

  viewToday(){
    const mymodalOptions: ModalOptions ={
      enableBackdropDismiss: false
    }
    const mymodal = this.modal.create('EventTodayPage',{}, mymodalOptions);
    mymodal.present();
  }
}
