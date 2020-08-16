import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Profile } from '../../models/user/profile';
import { DataService } from '../../providers/data/data.service';
/**
 * Generated class for the ViewProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-profile',
  templateUrl: 'view-profile.html',
})
export class ViewProfilePage {

  ownerProfile: Profile;
  avatar : any;
  name : any;
  about: any;
  age: any;
  gender: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private data: DataService,
    private view: ViewController) {
      const id = this.navParams.get('id');
      // const year = new Date().getFullYear();
      this.data.getProfileById(id).subscribe((profile: Profile)=>{
        this.ownerProfile = <Profile>profile;
        console.log(this.ownerProfile);
       this.avatar =  this.ownerProfile.avatar;
       this.name = this.ownerProfile.name;
       this.about = this.ownerProfile.aboutme;
        this.age = this.getAge(this.ownerProfile.dateOfBirth);
        this.gender = this.ownerProfile.gender;
      //  let b = a.split('-');
        
      //  console.log(b[0]);
       
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewProfilePage');
  }
  backToMain(){
    this.view.dismiss();
  }

  getAge(birthdate){
    const year = new Date().getFullYear();
    let a = birthdate.toString().split('-');
    return year - a[0];
   


  }

}
