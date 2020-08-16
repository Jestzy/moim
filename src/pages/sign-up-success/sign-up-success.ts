import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Vibration } from '@ionic-native/vibration';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the SignUpSuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up-success',
  templateUrl: 'sign-up-success.html',
})
export class SignUpSuccessPage {
  id:any;
  constructor(public navCtrl: NavController,
    private alertCtrl:AlertController,
    private db: AngularFireDatabase,
    private vibrate: Vibration,
     public navParams: NavParams) {
  this.id = this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpSuccessPage');
  }
  delete(){
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
          this.db.database.ref(`/event-list/`).orderByChild('keyid').equalTo(this.id).on('child_added', (snapshot) => {
            snapshot.ref.remove();
          });
          this.db.database.ref(`/event-love/`).orderByChild('keyid').equalTo(this.id).on('child_added', (snapshot) => {
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
