import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActDetailPage } from './act-detail';

@NgModule({
  declarations: [
    ActDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ActDetailPage),
  ],
})
export class ActDetailPageModule {}
