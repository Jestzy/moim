import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ComponentsModule } from '../components/components.module';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MainPage } from '../pages/main/main';
import { ChatPage } from '../pages/chat/chat';
import { SettingPage } from '../pages/setting/setting';
import { ChatPageModule } from '../pages/chat/chat.module';
import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CONFIG } from './app.firebase.config';
import {  AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AuthService } from '../providers/auth.service';
import { DataService } from '../providers/data/data.service';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../providers/chat/chat.service';
import { LocalNotifications } from '@ionic-native/local-notifications';
// import { GoogleMap } from '@'
// import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
// import { ImageService } from '../providers/image.service';
// import { ImagePicker } from '@ionic-native/image-picker';
// import { Crop } from '@ionic-native/crop';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { EventAllPage } from '../pages/event-all/event-all';
import { SettingPageModule } from '../pages/setting/setting.module';
import { Vibration } from '@ionic-native/vibration';
// import { NetworkProvider } from '../providers/network/network';
@NgModule({
  declarations: [
    MyApp,
    // HomePage,
    TabsPage,
    MainPage,
    // ChatPage,
    // SettingPage,
    EventAllPage
    // ComponentsModule
    

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: true,
    }),
    ChatPageModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
   SettingPageModule,
    FormsModule
    // ComponentsModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // HomePage,
    TabsPage,
    MainPage,
    ChatPage,
    SettingPage,
    EventAllPage
    // ComponentsModule

  ],
  providers: [
    StatusBar,
    SplashScreen,
    // {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    DataService,
    ChatService,
    LocalNotifications,
    // ImageService,
    // Camera,
    // ImagePicker,
    // Crop,
   Geolocation,
   NativeGeocoder,
   Vibration
    // NetworkProvider
  ]
})
export class AppModule {}
