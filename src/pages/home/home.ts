import { Component,EventEmitter,Output} from '@angular/core';
import { IonicPage, NavController, NavParams, Toast, Tabs } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { User } from 'firebase/app';
import { Account } from '../../models/account/account';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';
import { AuthService } from "../../providers/auth.service"
import { DataService } from '../../providers/data/data.service';
import { LoginResponse } from '../../models/login/login-response';
import { FirebaseError } from '@firebase/util';

// import { LoginFormComponent } from '../../components/login-form/login-form';
// import { MainPage } from '../main/main';
// import { EditProfilePage } from '../edit-profile/edit-profile';
// import { SettingPage } from '../setting/setting';
// import { Account } from '../../models/account/account';
// import { CompileMetadataResolver } from '@angular/compiler';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {

  account = {} as Account ;
  @Output() loginStatus: EventEmitter<LoginResponse>;
  constructor(
    private afAuth: AngularFireAuth,
    private Auth: AuthService,
    private data: DataService,
    public toastCtrl: ToastController,
    public navCtrl: NavController, public navParams: NavParams) {
      this.loginStatus = new EventEmitter<any>();
    
     console.log( this.afAuth.authState);
    // this.afAuth.authState.subscribe(c =>{
    //   if(c != null){
    //     this.afAuth.auth.signOut();
    //   }
    // });
   
    // console.log(a);
    // this.Auth.signout();

  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad HomePage');
  // }

  // getAuthenticateUser(){
  //   return this.afAuth.auth.
  // }
 async  gotoTabs(account: Account){
        this.afAuth.auth.signInWithEmailAndPassword(account.email, account.password)   
        .then((resulta) => {
           
            this.toastCtrl.create({
              message: 'Login successfully!',
              duration: 2000,
              position: 'top'
            });
            // this.data.getProfile(<User>resulta.user).subscribe(profile =>{
            //   console.log(profile.name);
            //   profile? this.navCtrl.setRoot(TabsPage) : this.navCtrl.setRoot('EditProfilePage');
            // })
            this.navCtrl.setRoot(TabsPage)
        })
        .catch((error: FirebaseError) => {
          console.error(error);
          let errorCode = error.message // THIS CAN'T BE READ
          const toast =   this.toastCtrl.create({
            message: errorCode,
            duration: 2000,
            position: 'top'
          });
          toast.present();      
      });
  }
 

  
  gotoSignUp(){
    this.navCtrl.push('SignUpPage');
  }


  getAuthenticatedUser(){
    return this.afAuth.authState;
  }

  





}
