import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
/**
 * Generated class for the EventTodayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-today',
  templateUrl: 'event-today.html',
})
export class EventTodayPage implements OnInit{

  ngOnInit(){
    this.eventList = this.db.list('event-list',ref=> ref.orderByChild('timestamp')).valueChanges();

  }
  start:any;
  end:any
  eventList: Observable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private db: AngularFireDatabase) {
      this.start = new Date();
      this.start.setHours(0,0,0,0);
  this.end = new Date();
      this.end.setHours(23,59,59,999);
      console.log( this.start.getTime() + ':' + this.end.getTime());


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventTodayPage');
  }
  gotoEventView(eventid: any){
    this.navCtrl.push('EventViewPage',{id : eventid});
  }
  closeModal(){
    this.navCtrl.pop();
  }


}
