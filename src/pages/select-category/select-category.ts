import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading,LoadingController } from 'ionic-angular';
// import { ToastController } from 'ionic-angular';
// import { Observable } from 'rxjs';
// import {AngularFireList, AngularFireDatabase} from 'angularfire2/database';
// import { EventItem } from '../../models/event-item.interface';
// import { AuthService } from '../../providers/auth.service';
// import { Profile } from '../../models/user/profile';
// import { User } from 'firebase/app';
// import { DataService } from '../../providers/data/data.service';
/**
 * Generated class for the SelectCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-category',
  templateUrl: 'select-category.html',
})
export class SelectCategoryPage {
  
 
 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectCategoryPage');
  }
  backToMain(){
    this.navCtrl.pop();
  }
  gotoEventByCat(category){
    this.navCtrl.push('EventViewCatPage',{category});
  }

}
