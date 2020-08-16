import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventViewCatPage } from './event-view-cat';

@NgModule({
  declarations: [
    EventViewCatPage,
  ],
  imports: [
    IonicPageModule.forChild(EventViewCatPage),
  ],
})
export class EventViewCatPageModule {}
