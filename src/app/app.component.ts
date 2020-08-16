import { Component } from '@angular/core';
import { Platform, Events  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
// import { NetworkService } from '../providers/network/network.service';
import { HomePage } from '../pages/home/home';
import { timer } from 'rxjs/observable/timer';
import { AuthService } from '../providers/auth.service';
import { TabsPage } from '../pages/tabs/tabs';
import { AddEventSuccessPage } from '../pages/add-event-success/add-event-success';
import { SelectCategoryPage } from '../pages/select-category/select-category';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  showSplash = true;

  constructor(platform: Platform, statusBar: StatusBar,
     splashScreen: SplashScreen,
     public events: Events,
    //  public network: NetworkService,
     private auth: AuthService) {
      // splashScreen.show();
      console.log('splash');
      //  this.auth.getAuthenticatedUser().subscribe(auth =>{
      //    !auth?
      //     this.rootPage = 'SlidePage' :
      //     this.rootPage = TabsPage;
      //  })
    // splashScreen.show();
    platform.ready().then(() => {
      timer(2000).subscribe(() =>{ this.showSplash =false
        });
      // if(this.showSplash == false){
        this.auth.getAuthenticatedUser().subscribe(auth =>{
          !auth?
           this.rootPage = 'SlidePage' :
           this.rootPage = TabsPage;
          // if(!auth){
          //    this.rootPage = 'SlidePage';
          //    }
          // else
          //  {this.rootPage = TabsPage;}

        })
      // }
    
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.network.initializeNetworkEvents();

	    //    		// Offline event
			//     this.events.subscribe('network:offline', () => {
			//         alert('network:offline ==> '+this.network.type);    
			//     });

			//     // Online event
			//     this.events.subscribe('network:online', () => {
			//         alert('network:online ==> '+this.network.type);        
      //     });
      // splashScreen.show();
      statusBar.styleDefault();
      // splashScreen.hide();
    // 
      // timer(3000).subscribe(() => this.showSplash = false);
    });
  }
  
}

