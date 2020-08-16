import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Chat1to1Page } from './chat1to1';

@NgModule({
  declarations: [
    Chat1to1Page,
  ],
  imports: [
    IonicPageModule.forChild(Chat1to1Page),
  ],
})
export class Chat1to1PageModule {}
