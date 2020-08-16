import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalOptions, ModalController, ToastController } from 'ionic-angular';
import { async } from '@firebase/util';
import { DataService } from '../../providers/data/data.service';
import { FirebaseDatabase } from '@firebase/database-types';
import { AngularFireDatabase } from 'angularfire2/database';
import { Profile } from '../../models/user/profile';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profile: any;
  result: Profile[];
  ownerProfile:Profile;
  allkey: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private db: AngularFireDatabase,
    private modal: ModalController,
    private toastCtrl : ToastController,
    private data: DataService) {
    let key =  this.navParams.get('keyid');
    this.db.list(`event-who-love/${key}/`).valueChanges().subscribe(ref => {
      this.result = [];
      this.allkey =[];
      for(let key in ref) {
        console.log(ref[key]);
        this.allkey.push(ref[key]);
        console.log(this.allkey,'All key');
        let id = ref[key];
        this.data.getProfileById(id).subscribe((profile: Profile)=>{
          this.ownerProfile = <Profile>profile;
        
           this.result.push(this.ownerProfile);
          console.log(this.ownerProfile);
          console.log(this.result);    
        })
      }
    })
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    console.log(this.result);
    this.presentToast();
  }
  viewProfile(uid){
    const mymodalOptions: ModalOptions ={
      enableBackdropDismiss: false
    }
    let id = this.allkey[uid];
    console.log(id);
    const mymodal = this.modal.create('ViewProfilePage',{id}, mymodalOptions);
    mymodal.present();
  }
  chat(id){
    let uid = this.allkey[id];
    console.log(id);
    this.navCtrl.push('Chat1to1Page',{uid});
  }
  presentToast() {
    const toast = this.toastCtrl.create({
      message: ' Swipe to the left to see more buttons.',
      duration: 3000
    });
    toast.present();
  }

}
