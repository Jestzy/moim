import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignUpPage } from './sign-up';
import { AngularFireAuthModule} from 'angularfire2/auth';

@NgModule({
  declarations: [
    SignUpPage,
  ],
  imports: [
    IonicPageModule.forChild(SignUpPage),
    AngularFireAuthModule
  ],
})
export class SignUpPageModule {}
