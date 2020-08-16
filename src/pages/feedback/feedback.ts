import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  feedback: any;
  constructor(public navCtrl: NavController,
    private alertCtrl : AlertController,
    private vibrate: Vibration,
     public navParams: NavParams) {

  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad FeedbackPage');
  }

  send(){
    let alert = this.alertCtrl.create({
      title:"<div class='center'><img src='../assets/imgs/feedback_1x1.png' width='100px' height='100px' class='center'/></div>" ,
      message: 'Thank you for your suggestion',
      cssClass: 'center',
      buttons: [
        {
          text:'Back',
          role: 'cancel',
          cssClass: 'center',
          handler : ()=>{
            console.log('cancle click');
          }
        }
      ]
    });
    this.vibrate.vibrate(1000);
    alert.present();
  }

}
