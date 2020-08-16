import { Component } from '@angular/core';
// import { IonicPageModule } from 'ionic-angular';

/**
 * Generated class for the LoginFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'login-form',
  templateUrl: 'login-form.html'
})
export class LoginFormComponent {

  text: string;

  constructor() {
    console.log('Hello LoginFormComponent Component');
    this.text = 'Hello World';
  }

}
