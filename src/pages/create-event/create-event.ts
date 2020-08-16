import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { EventItem } from '../../models/event-item.interface';
import { User } from 'firebase/app';
import { Subscription } from'rxjs/Subscription';
import { AuthService } from '../../providers/auth.service';
import { Profile } from '../../models/user/profile';
import { DataService } from '../../providers/data/data.service';
// import { from } from 'rxjs';

/**
 * Generated class for the CreateEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-event',
  templateUrl: 'create-event.html',
})
export class CreateEventPage {
  eventItem = {}  as EventItem;
  eventItemRef$: AngularFireList<EventItem>
  private authenticatedUser$: Subscription;
  private authenticatedUser: User;
  userProfile : Profile;
  today : any;
  timestamp: string;
  max: any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private auth: AuthService,
              private data: DataService,
              private db: AngularFireDatabase) 
              { 
                
                this.today = new Date().getFullYear().toString() +'-'
                + new Date().getMonth().toString() +'-'+ new Date().getDate().toString() ;
                this.max = new Date();
                let b = new Date().valueOf();
               
                // minDate = 


              this.timestamp = new Date().valueOf() + Math.floor(Math.random()*100).toString();
                // this.timestamp = Number(a).toString();
                console.log(this.today);
                // console.log(b,'origi');
                // console.log(a);
                console.log(this.timestamp);
                 console.log(typeof(this.timestamp));
                // this.maxday =
                // this.eventItemRef$ = this.db.list('event-list');
                this.auth.getAuthenticatedUser().subscribe((user:User) => {
                  if(user)
                 { this.authenticatedUser = user;
                  this.data.getProfile(user).subscribe((profile: Profile)=>{
                      this.userProfile = <Profile>profile;
                      // this.loader.dismiss();
                      
                  })}
                })
     }

 addEventItem(eventItem: EventItem){
//  this.eventItemRef$.push({
//    eventname: this.eventItem.eventname,
//    owner: this.userProfile.name,
//    time: this.eventItem.time,
//    uid: this.authenticatedUser.uid,
//    map: this.eventItem.map
//  })
  //reset the EventItem
  // this.eventItem = {} as EventItem;
  // let a= this.eventItemRef$;
  //   console.log(this.eventItemRef$);
  eventItem.owner = this.userProfile.name;
  eventItem.uid = this.authenticatedUser.uid;
  eventItem.avatar = this.userProfile.avatar;
  eventItem.keyid  = this.timestamp;

    console.log(eventItem);
    this.navCtrl.push('SelectMapPage',{eventItem});
  // this.navCtrl.pop();
  // this.navCtrl.push('SelectMapPage');
}
  backToMain(){
    this.navCtrl.pop();
  }

  gotoSelectMap(){
    let a= this.eventItemRef$;
    console.log(this.eventItemRef$);
    this.navCtrl.push('SelectMapPage',{a});
  }

}
