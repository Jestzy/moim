import { Component } from '@angular/core';
import { MainPage } from '../main/main';
import { ChatPage } from '../chat/chat';
import { SettingPage } from '../setting/setting';
import { EventAllPage } from '../event-all/event-all';


/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  mainPage = MainPage;
  chatPage = ChatPage;
  eventPage = EventAllPage;
  settingPage = SettingPage;
}
