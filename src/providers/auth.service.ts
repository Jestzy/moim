// import { HttpClient } from '@angular/common/http';
import { Injectable,EventEmitter,Output } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Account } from '../models/account/account';
import { ToastController } from 'ionic-angular';
// import { IonicPage, NavController, NavParams, Toast } from 'ionic-angular';
// import { TabsPage } from '../pages/tabs/tabs';
import { LoginResponse } from '../models/login/login-response';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseError } from '@firebase/util';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthService {
// private nav: NavController;
@Output() login : EventEmitter<LoginResponse>;
  constructor(private auth:AngularFireAuth,
    private database: AngularFireDatabase,
    public toastCtrl: ToastController,
    // public nav: NavParams
    ) {
      this.login = new EventEmitter<LoginResponse>();
    console.log('Hello AuthProvider Provider');
  }

  getAuthenticatedUser(){
    return this.auth.authState;
  }

  async signInWithEmailAndPassword(account: Account){
    this.auth.auth.signInWithEmailAndPassword(account.email, account.password)   
    .then((resulta) => {    
            this.toastCtrl.create({
              message: 'Login successfully!',
              duration: 2000,
              position: 'top'
            });
            // console.log(result.user.uid);
          // this.login.emit(result);
            // this.navCtrl.push(TabsPage);
           const eventa : LoginResponse = {
             result :  resulta.user          
            }
            //console.log(resulta.user.uid)
            //console.log(eventa);
            // this.login.emit(eventa); 
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
      // const a = await this.loginStatus();
      // return eventa;
  }

  //  loginStatus(){
  //  const a  =  this.login;
  //   console.log("from login Status in Auth");
  //   console.log(a);
  //   // console.log(eventa);

  // }
  signout(){
    // this.database.database.goOffline();
    return  this.auth.auth.signOut();
  }

}
