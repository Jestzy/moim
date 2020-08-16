// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  { AngularFireDatabase,AngularFireObject,AngularFireList} from 'angularfire2/database'
import { User } from "firebase/app";
import { Observable } from 'rxjs/Observable';
import { database } from "firebase";
import { Profile } from "../../models/user/profile";
import { EventItem } from '../../models/event-item.interface';
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import { AuthService } from '../auth.service';
/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataService {

  profileObject: AngularFireObject<Profile>
  constructor(private db: AngularFireDatabase,
    private authService: AuthService) {
    console.log('Hello DataProvider Provider');
  }

  // getProfile(user: User){
  //   this.profileObject = this.db.object(`/profiles/${user.uid}`);
  //   return this.profileObject.valueChanges();
  // }
  getProfile(user: User): Observable<Profile> {
    this.profileObject = this.db.object(`/profiles/${user.uid}`);
    return this.profileObject.valueChanges().take(1);
  }
  getProfileById(id){
    this.profileObject = this.db.object(`/profiles/${id}`);
    return this.profileObject.valueChanges();
  }
  
  async saveprofile(user: User, profile : Profile): Promise<boolean>{
    this.profileObject = this.db.object(`/profiles/${user.uid}`)
    try{
     await this.profileObject.set(profile);
     return true;
    }catch(e){
      console.error(e);
      return false;
    }
  }
  // getAuthenticatedUserProfile() {
  //   return this.authService.getAuthenticatedUser()
  //   .map(user => user.uid)
  //   .mergeMap(authId => this.db.object(`/profiles/${authId}`)
  //   .valueChanges())
  //   .take(1);
  // }
  getAuthenticatedUserProfile(): Observable<any> {
    return this.authService.getAuthenticatedUser()
      .map((user) => user.uid)
      .mergeMap(authId => this.db.object<Profile>(`/profiles/${authId}`)
        .snapshotChanges()
        .map(profile => ({
          payload: profile.payload.val(),
          key: profile.key
        })
        )
      )
      .take(1);
  }

  setUserOnline(profile: Profile){
    const ref = database().ref(`online-users/${profile.key}`)
    try{
      ref.update({...profile});
      ref.onDisconnect().remove();
    }
    catch(e){
      console.log(e);
    }
  }
  eventList$: AngularFireList<EventItem>;
  search(name: string): Observable<any[]> {

    this.eventList$ = this.db.list<EventItem>('event-list', (res) => {
      return res.orderByChild('eventname').equalTo(name);
    });
    return this.eventList$.snapshotChanges().take(1);
  }
  
  getOnlineUsersList(): Observable<any[]> {
    return this.db.list<Profile>('online-users/').snapshotChanges();
  }

}
