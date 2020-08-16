// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList,AngularFireObject } from 'angularfire2/database';
import { Message } from '../../models/messages/message';
import { AuthService } from '../auth.service';
import { User } from 'firebase/app';
// import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/first';
import { messaging, auth } from 'firebase';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/first';

// import { auth } from 'firebase';

// import { Message } from '@angular/compiler/src/i18n/i18n_ast';
// import { Message } from '@angular/compiler/src/i18n/i18n_ast';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatService {
  check:number;
  constructor(private db : AngularFireDatabase,
    private auth: AuthService) {
    console.log('Hello ChatProvider Provider');
    // this.auth.getAuthenticatedUser().subscribe((user:User) => {
    //   if(user){
    //     this.check = 1;
    //   }
    //   else{
    //     this.check =2;
    //   }
    // });
  }

  async sendChat(message: Message){
    await this.db.list('/messages').push(message);
  }

  getChat(userTwoId : string){
    return this.auth.getAuthenticatedUser()
    //gets the authenticated user and returns uid
    .map(auth => auth.uid)
    //takes the uid and uses it in a merge with a list of the users imessages with user two
    .mergeMap(uid => {
    console.log('uid',uid);
    console.log('userTwoId',userTwoId);
    return this.db.list(`/user-messages/${uid}/${userTwoId}`).snapshotChanges()
    })
    //iterate and join as observable 
    .mergeMap(privatechats => {
    return Observable.forkJoin(
    //map private chat just to retrieve the key
    privatechats.map(privatechat => {
    //use that key to get the proper message
    //map the message and pass the key into the payload
    return this.db.object(`/messages/${privatechat.key}`)
    .snapshotChanges().map(privatechatmessage => {
    let tempPayLoad = privatechatmessage.payload.val();
    tempPayLoad['$key'] = privatechatmessage.key;
    return tempPayLoad;
    })
    .first();
    }),
    (...vals: Message[]) => {
    return vals;
    }
    )
    //puts the return Message[] into an observable using the Forkjoin
    
    });
  }

  // getLastMessageForUser(): Observable<Message[]>{
  //   return this.auth.getAuthenticatedUser()
  //     .map(auth => auth.uid)
  //     // .mergeMap(authId => this.db.list(`/last-messages/${authId}`))
  //     .mergeMap(authId => {
  //       // console.log('uid',uid);
  //       return this.db.list(`/last-messages/${authId}`).snapshotChanges()
  //       })
     
  //     .mergeMap(messageIds => {
  //       return Observable.forkJoin(
  //         messageIds.map(message => {
  //           return this.db.object(`/messages/${message.key}`)
  //           .snapshotChanges().map(privatechatmessage => {
  //             let tempPayLoad = privatechatmessage.payload.val();
  //           //   tempPayLoad['key'] = privatechatmessage.key;
  //           //  console.log(privatechatmessage.key);
  //             return tempPayLoad;
  //             })
  //             .first()
  //         }),
  //         (...values) => {
  //           console.log(values);
  //           return values;
  //         }
  //       )
  //     })
  // }
  //
  // getLastMessageForUser(): Observable<Message[]>{
  //   return this.auth.getAuthenticatedUser()
  //     .map(auth => auth.uid)
  //     .mergeMap(authId => this.db.list(`/last-messages/${authId}`).snapshotChanges())
  //     .mergeMap(messageIds => {
  //       return Observable.forkJoin(
  //         messageIds.map(message => {
  //           const $key = message.payload.key;
  //           const datas = {$key,...message.payload.val()};
  //           return this.db.object(`/messages/${$key}`).snapshotChanges().first()
  //         }),
  //         (...values) => {
  //           console.log(values);
  //           return values;
  //         }
  //       )
  //     })
  //   }

    // return Observable.forkJoin(
    //   //map private chat just to retrieve the key
    //  messageIds.map(privatechat => {
    //   //use that key to get the proper message
    //   //map the message and pass the key into the payload
    //   return this.db.object(`/messages/${privatechat.key}`)
    //   .snapshotChanges().map(privatechatmessage => {
    //   let tempPayLoad = privatechatmessage.payload.val();
    //   let key = privatechatmessage.key;
    //   return this.db.object(`/messages/${key}`).snapshotChanges().first()
    //   })
    //   .first();
    //   }),
    //   (...vals: Message[]) => {
    //   return vals;
    //   }
    //   )
    //   //puts the return Message[] into an observable using the Forkjoin
      
    //   });
    // }
  
// BESt
 getLastMessageForUser(): Observable<Message[]>{
  
 
         return this.auth.getAuthenticatedUser()
             .map(auth =>auth.uid)
             .mergeMap(authId => this.db.list(`last-messages/${authId}`)
             .snapshotChanges())
             .mergeMap(lastMessages =>
                 Observable.forkJoin(
                     lastMessages.map(message =>
                        this.db.object(`/messages/${message.payload.val().key}`).valueChanges().first()),
                     (...vals) => {
                       console.log(vals);
                         return vals;

                     })
             ) 
             
                    }


//  getLastMessageForUser(): Observable<Message[]>{
//    return this.auth.getAuthenticatedUser()
//      .map(auth => auth.uid)
//      .mergeMap(authId => this.db.list(`last-messages/${authId}`).snapshotChanges())
//      .mergeMap(messageIds => {
//        return Observable.forkJoin(
//          messageIds.map(message => {
//            return this.db.object(`/messages/${message.key}`).valueChanges()
//              .first()
//          }),
//          (...values) => {
//            console.log(values);
//            return values;
//          }
//        )
//      })
//  }
  // getLastMessageForUser(): Observable<Message[]> {
  //   return this.auth.getAuthenticatedUser()
  //       .map(auth => auth.uid)
  //       .mergeMap(authId => this.db.list(`last-messages/${authId}`)
  //       .snapshotChanges())
  //       .mergeMap(lastMessages =>
  //           Observable.forkJoin(
  //               lastMessages.map(message =>{
  //                 return this.db.object(`/messages/${message.key}`)
  //                 .snapshotChanges().map(privatechatmessage => {
  //                 // let PayLoad = privatechatmessage.payload.val();
  //                const data = privatechatmessage.payload.key;
  //                let PayLoad = {data,...privatechatmessage.payload.val()};
  //                 return PayLoad;
  //                 })
  //             }),
  //               (...vals) => {
  //                 console.log(vals);
  //                   return vals;
  //                   // console.log(val);
  //               })
  //       )
// }


} 
