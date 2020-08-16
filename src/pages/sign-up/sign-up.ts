import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TabsPage} from '../tabs/tabs';
import { AngularFireAuth }  from 'angularfire2/auth';
import { Account } from '../../models/account/account';
import { DataService } from '../../providers/data/data.service';
import { EditProfilePage } from '../edit-profile/edit-profile';
/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  account ={ } as Account;
  avatar: any;
  confirm:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private afAuth: AngularFireAuth,
              private data: DataService,
              private toast: ToastController) {
                this.avatar = Math.floor((Math.random()* 9) +1);
                console.log(this.avatar);

  }
  // public event = {
  //   month: new Date()
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }
  gotoTabs(){
    this.navCtrl.push(TabsPage);
  }
  async gotoSignUp2(avatar)
  {
    try{
   const result = await  this.afAuth.auth.createUserWithEmailAndPassword(this.account.email, this.account.password)
    this.toast.create({
      message : "Account successfully created.",
      duration: 3000
    }).present();
    console.log(result);
    this.navCtrl.push(TabsPage);
    // this.navCtrl.push('EditProfilePage');
    // this.data.getProfile(result.user).subscribe(profilew =>{
    //   // console.log(profile);
    //   console.log(avatar);
      // this.navCtrl.setRoot('EditProfilePage');
      // profilew? this.navCtrl.setRoot(TabsPage) : this.navCtrl.setRoot('EditProfilePage');
      // if(!profilew){
      //   this.navCtrl.setRoot('EditProfilePage')
      // }
      // else{
      //   this.navCtrl.setRoot(TabsPage)
      // }
  //   })
  } 
    catch(e){
      console.error(e);
      this.toast.create({
        message: e.message,
        duration: 3000
      }).present();
    }
    // this.navCtrl.push('EditProfilePage');
}


}
