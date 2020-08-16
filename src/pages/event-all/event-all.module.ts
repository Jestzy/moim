import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventAllPage } from './event-all';

@NgModule({
  declarations: [
    EventAllPage,
  ],
  imports: [
    IonicPageModule.forChild(EventAllPage),
  ],
})
export class EventAllPageModule {}
