import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventTodayPage } from './event-today';

@NgModule({
  declarations: [
    EventTodayPage,
  ],
  imports: [
    IonicPageModule.forChild(EventTodayPage),
  ],
})
export class EventTodayPageModule {}
