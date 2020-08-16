import { Component,OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, normalizeURL } from 'ionic-angular';
import { Profile } from '../../models/user/profile';
import { DataService } from "../../providers/data/data.service"
import { AuthService } from '../../providers/auth.service';
import { Subscription } from'rxjs/Subscription';
import { User } from 'firebase/app';
// import { storage } from 'firebase';
// import { SettingPage } from '../setting/setting';
// import { ImagePicker} from '@ionic-native/image-picker';
// import { Crop } from '@ionic-native/crop';
// import { ImageService } from  '../../providers/image.service';
import { TabsPage } from '../tabs/tabs';
// import { Camera,CameraOptions } from '@ionic-native/camera';
// import {  ImagePickerOriginal } from '@ionic-native/image-picker';
// import {Crop,CropOriginal} from '@ionic-native/crop';
/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage implements OnDestroy {

  profile = {} as Profile;
  private authenticatedUser$: Subscription;
  private authenticatedUser: User;
  avatar: any;
  edit: any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private data: DataService,
     private auth: AuthService
    //  public imagePicker: ImagePicker,
    //  public cropService: Crop,
    //  private imageService : ImageService,
    //  private cropService: CropOriginal,
    //  private imagePicker: ImagePickerOriginal,
    //  private camera: Camera
     ) {
      //  this.avatar = this.navParams.get('avatar');
       this.edit = this.navParams.get('edit');
       console.log(this.avatar);
       console.log(this.edit);
       this.authenticatedUser$ = this.auth.getAuthenticatedUser().subscribe((user: User) =>{
         if(user)
       {  this.authenticatedUser = user;
         console.log(user);}
         
       })
       if(this.avatar == undefined){
        this.avatar = Math.floor((Math.random()* 9) +1);
       }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  } 
  // takePhoto(){
   
  //   const option: CameraOptions = {
  //     quality: 50,
  //     targetHeight: 600,
  //     targetWidth: 600,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }
  // }

   async saveProfile(){
     if(this.authenticatedUser){
       this.profile.email = this.authenticatedUser.email;
       this.profile.avatar = this.avatar;
      const result = await this.data.saveprofile(this.authenticatedUser,this.profile);
      console.log(result); 
      // this.navCtrl.push(TabsPage);
     }
     this.navCtrl.push(TabsPage);
  }
  backToMain(){
    this.navCtrl.pop();
  }
  ngOnDestroy(): void{
    this.authenticatedUser$.unsubscribe();
  }

  // openImagePickerCrop(){
  //   this.imagePicker.hasReadPermission().then(
  //     (result) => {
  //       if(result == false){
  //         // no callbacks required as this opens a popup which returns async
  //         this.imagePicker.requestReadPermission();
  //       }
  //       else if(result == true){
  //         this.imagePicker.getPictures({
  //           maximumImagesCount: 1
  //         }).then(
  //           (results) => {
  //             for (var i = 0; i < results.length; i++) {
  //               this.cropService.crop(results[i], {quality: 75}).then(
  //                 newImage => {
  //                   this.uploadImageToFirebase(newImage);
  //                 },
  //                 error => console.error("Error cropping image", error)
  //               );
  //             }
  //           }, (err) => console.log(err)
  //         );
  //       }
  //     }, (err) => {
  //       console.log(err);
  //     });
  //   }
    // uploadImageToFirebase(image){
      // image = normalizeURL(image);
    
      //uploads img to firebase storage
      // this.uploadImage(image)
      // .then(photoURL => {
    
      //   let toast = this.toastCtrl.create({
      //     message: 'Image was updated successfully',
      //     duration: 3000
      //   });
      //   toast.present();
      //   })
      // }

      // uploadImage(imageURI){
      //   return new Promise<any>((resolve, reject) => {
      //     let storageRef = storage().ref();
      //     let imageRef = storageRef.child('image').child('imageName');
      //     this.encodeImageUri(imageURI, function(image64){
      //       imageRef.putString(image64, 'data_url')
      //       .then(snapshot => {
      //         resolve(snapshot.downloadURL)
      //       }, err => {
      //         reject(err);
      //       })
      //     })
      //   })
      // }
      // encodeImageUri(imageUri, callback) {
      //   var c = document.createElement('canvas');
      //   var ctx = c.getContext("2d");
      //   var img = new Image();
      //   img.onload = function () {
      //     var aux:any = this;
      //     c.width = aux.width;
      //     c.height = aux.height;
      //     ctx.drawImage(img, 0, 0);
      //     var dataURL = c.toDataURL("image/jpeg");
      //     callback(dataURL);
      //   };
      //   img.src = imageUri;
      // };
      // openImagePickerCrop(){
      //   this.imagePicker.hasReadPermission().then(
      //     (result) => {
      //       if(result == false){
      //         // no callbacks required as this opens a popup which returns async
      //         this.imagePicker.requestReadPermission();
      //       }
      //       else if(result == true){
      //         this.imagePicker.getPictures({
      //           maximumImagesCount: 1
      //         }).then(
      //           (results) => {
      //             for (var i = 0; i < results.length; i++) {
      //               this.cropService.crop(results[i], {quality: 75}).then(
      //                 newImage => {
      //                   this.uploadImageToFirebase(newImage);
      //                 },
      //                 error => console.error("Error cropping image", error)
      //               );
      //             }
      //           }, (err) => console.log(err)
      //         );
      //       }
      //     }, (err) => {
      //       console.log(err);
      //     });
      // }
    
      // openImagePicker(){
      //   this.imagePicker.hasReadPermission().then(
      //     (result) => {
      //       if(result == false){
      //         // no callbacks required as this opens a popup which returns async
      //         this.imagePicker.requestReadPermission();
      //       }
      //       else if(result == true){
      //         this.imagePicker.getPictures({
      //           maximumImagesCount: 1
      //         }).then(
      //           (results) => {
      //             for (var i = 0; i < results.length; i++) {
      //               this.uploadImageToFirebase(results[i]);
      //             }
      //           }, (err) => console.log(err)
      //         );
      //       }
      //     }, (err) => {
      //       console.log(err);
      //     });
      // }
    
      // uploadImageToFirebase(image){
      //   image = normalizeURL(image);
      //   let userId = this.authenticatedUser.uid;
      //   //uploads img to firebase storage
      //   this.imageService.uploadImage(image,userId)
      //   // .then(photoURL => {
          
      //   //   let toast = this.toastCtrl.create({
      //   //     message: 'Image was updated successfully',
      //   //     duration: 3000
      //   //   });
      //   //   toast.present();
      //   //   })
      // }
    
}
