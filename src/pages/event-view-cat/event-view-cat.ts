import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireList, AngularFireDatabase} from 'angularfire2/database';
import { EventItem } from '../../models/event-item.interface';
import { Observable } from 'rxjs';
/**
 * Generated class for the EventViewCatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-view-cat',
  templateUrl: 'event-view-cat.html',
})
export class EventViewCatPage {
  category : string;
  eventListRef$: AngularFireList<EventItem>;
  eventList: Observable<any[]>;
  empty$:Observable<boolean>;
  date: any;
  today: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private db: AngularFireDatabase) {
    this.category = this.navParams.get('category');
    console.log(this.category);


    this.date = new Date().toDateString().split(" ")[1]+" "+[2]+[3];
    this.today = new Date().getTime() - 86400000  ;
    this.eventList = this.db.list('event-list', ref=> ref.orderByChild('category').equalTo(this.category)).valueChanges();
    this.empty$ = this.eventList.map(ref=> ref.length ===0);
    console.log(this.eventList);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventViewCatPage');
  }
  gotoEventView(eventid: any){
    this.navCtrl.push('EventViewPage',{id : eventid});
  }

}
