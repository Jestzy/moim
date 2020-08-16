import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MainPage } from '../main/main';
import { TabsPage } from '../tabs/tabs';
import { Vibration } from '@ionic-native/vibration';

/**
 * Generated class for the AddEventSuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-event-success',
  templateUrl: 'add-event-success.html',
})
export class AddEventSuccessPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private vibrate:Vibration) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventSuccessPage');
    this.vibrate.vibrate(1000);
  }
  backToHome(){
    this.navCtrl.push(TabsPage);
  }

}
