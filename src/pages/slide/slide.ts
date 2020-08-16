import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-slide',
  templateUrl: 'slide.html',
})
export class SlidePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SlidePage');
  }
  slides = [
    {
      title: "Welcome to the MOIM !",
      description: "Discover the events around you on <b>Moim</b>. We collect the activities that serve your interest. ",
      image: "../assets/imgs/slide1.png",
    },
    {
      title: "New Experience",
      description: "<b>Moim </b> will bring you to meet a new friend. Get a chance to know each other and do activity together.",
      image:"../assets/imgs/slide2.png",
    }
  ];
  gotoLogIn(){
    this.navCtrl.push('HomePage');
  }

}
