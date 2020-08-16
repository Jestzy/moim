import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,Loading, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { EventItem } from '../../models/event-item.interface';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
// import { a } from '@angular/core/src/render3';
import { NativeGeocoder, NativeGeocoderReverseResult} from '@ionic-native/native-geocoder';
import { MainPage } from '../main/main';
import { AddEventSuccessPage } from '../add-event-success/add-event-success';
// import { s } from '@angular/core/src/render3';
declare var google;
/**
 * Generated class for the SelectMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-map',
  templateUrl: 'select-map.html',
})
export class SelectMapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers: any;
  position : any;
  lat: any;
  long : any;
  time: any;
  eee: any;
  latLong : any;
  eventItem = {}  as EventItem;
  // eventItem = {}  as EventItem;
  eventItemRef$: AngularFireList<EventItem>
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private geolocation : Geolocation,private loading: LoadingController,
    private db: AngularFireDatabase,
    private geocode: NativeGeocoder
    ) {
      this.eventItem = this.navParams.get('eventItem');
    console.log(this.eventItem);
    this.eventItemRef$ = this.db.list('event-list');

     this.time = new Date().getHours()+ ":" + new Date().getMinutes();
     console.log(this.time);
    //  d 
      // this.loader = this.loading.create({
      //   content: 'Loading...'
      // });
      // this.position = this.navParams.get('f');
      // console.log(this.position);
      // this.geolocation.getCurrentPosition().then((resp) => {
      //   let pos = {
      //     lat: resp.coords.latitude,
      //     lng: resp.coords.longitude
      //   };
      //   console.log(pos);
      // this.lat = pos.lat;
      // console.log(this.lat);
      // this.long = pos.lng;
      //   // this.position.push(pos);
      //   let marker = new google.maps.Marker({
      //     position: pos,
      //     map: this.map,
      //     title: 'I am here!'
      //   });
      //   // this.markers.push(marker);
      //   // this.map.setCenter(pos);
      //   // this.loading.dismiss();
  
      // }).catch((error) => {
      //   console.log('Error getting location', error);
      //   // this.loading.dismiss();
      // });
  }

  ionViewWillLoad() {
   
// this.tryLoad();
     this.loadMap();
  }
  // async tryLoad(){
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     let pos = {
  //       lat: resp.coords.latitude,
  //       lng: resp.coords.longitude
  //     };
  //     console.log(pos);
  //   this.lat = pos.lat;
  //   console.log(this.lat);
  //   this.long = pos.lng;
  //     // this.position.push(pos);
  //     let marker = new google.maps.Marker({
  //       position: pos,
  //       map: this.map,
  //       title: 'I am here!'
  //     });
  //     // this.markers.push(marker);
  //     // this.map.setCenter(pos);
  //     this.loader.dismiss();

  //   }).catch((error) => {
  //     console.log('Error getting location', error);
  //     this.loader.dismiss();
  //   });

  // }
  

   loadMap(){
   
    this.position = new google.maps.LatLng(7.006067, 100.498763);
    this.latLong = [7.006067, 100.498763];
    let mapOptions = {
      center:  this.position,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      streetViewControl: false,
      mapTypeControl: false,
      // styles: [
      //   {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      //   {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      //   {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      //   {
      //     featureType: 'administrative.locality',
      //     elementType: 'labels.text.fill',
      //     stylers: [{color: '#d59563'}]
      //   },
      //   {
      //     featureType: 'poi',
      //     elementType: 'labels.text.fill',
      //     stylers: [{color: '#d59563'}]
      //   },
      //   {
      //     featureType: 'poi.park',
      //     elementType: 'geometry',
      //     stylers: [{color: '#263c3f'}]
      //   },
      //   {
      //     featureType: 'poi.park',
      //     elementType: 'labels.text.fill',
      //     stylers: [{color: '#6b9a76'}]
      //   },
      //   {
      //     featureType: 'road',
      //     elementType: 'geometry',
      //     stylers: [{color: '#38414e'}]
      //   },
      //   {
      //     featureType: 'road',
      //     elementType: 'geometry.stroke',
      //     stylers: [{color: '#212a37'}]
      //   },
      //   {
      //     featureType: 'road',
      //     elementType: 'labels.text.fill',
      //     stylers: [{color: '#9ca5b3'}]
      //   },
      //   {
      //     featureType: 'road.highway',
      //     elementType: 'geometry',
      //     stylers: [{color: '#746855'}]
      //   },
      //   {
      //     featureType: 'road.highway',
      //     elementType: 'geometry.stroke',
      //     stylers: [{color: '#1f2835'}]
      //   },
      //   {
      //     featureType: 'road.highway',
      //     elementType: 'labels.text.fill',
      //     stylers: [{color: '#f3d19c'}]
      //   },
      //   {
      //     featureType: 'transit',
      //     elementType: 'geometry',
      //     stylers: [{color: '#2f3948'}]
      //   },
      //   {
      //     featureType: 'transit.station',
      //     elementType: 'labels.text.fill',
      //     stylers: [{color: '#d59563'}]
      //   },
      //   {
      //     featureType: 'water',
      //     elementType: 'geometry',
      //     stylers: [{color: '#17263c'}]
      //   },
      //   {
      //     featureType: 'water',
      //     elementType: 'labels.text.fill',
      //     stylers: [{color: '#515c6d'}]
      //   },
      //   {
      //     featureType: 'water',
      //     elementType: 'labels.text.stroke',
      //     stylers: [{color: '#17263c'}]
      //   }
      // ]
    }
    console.log(mapOptions);
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.map.setCenter(this.position);
    // var centerControlDiv = document.createElement('div');
    //     var centerControl = new this.CenterControl(centerControlDiv, this.map);

    //     centerControlDiv.tabIndex= 1;
    //     this.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);
   
    var icon = {
      url: '../../assets/imgs/anchor-01.png', // url
      scaledSize: new google.maps.Size(40, 40), // scaled size
      // origin: new google.maps.Point(0,0), // origin
      // anchor: new google.maps.Point(0, 0) // anchor
  };
  
    var marker = new google.maps.Marker({position: this.position, map: this.map, icon: icon});
    marker.bindTo('position', this.map, 'center');
  
    console.log(marker);
   google.maps.event.addListener(this.map, 'center_changed' , () => {
    let a = this.map.getCenter().lat();
  let b  = this.map.getCenter().lng();
    // var b =this.map.getCameraPosition();
  //   console.log(marker);
  // let x = [a,b]
  //  this.latLong = this.geocode.reverseGeocode(a,b);
   this.latLong = [a,b];
  //  let xx = this.geocode.reverseGeocode(7.006067, 100.498763).then((result: NativeGeocoderReverseResult[])=>{
  //  this.eee = result[0];
  //  });
  //  console.log(xx);
   console.log(a,b);
   console.log(this.latLong);
   });
  }

  getGeo(){
    this.geolocation.getCurrentPosition().then((resp) => {
      let pos = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };
      console.log(pos);
    this.position = pos;
    console.log(this.position);
    this.map.setCenter(this.position);

    }).catch((error) => {
      console.log('Error getting location', error);
      // this.loader.dismiss();
    });
  }
  
  
  clearMarkers(){
    for (var i = 0; i < this.markers.length; i++) {
      console.log(this.markers[i])
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }
  addEvent(eventItem: EventItem){
    let a = this.getTimestamp(this.eventItem.date);
    let eventdate = this.getDate(this.eventItem.date);
    let eventtimestamp = this.eventItem.time.split(':');
    let timeTimestamp = (parseInt(eventtimestamp[0])  * 3600000) + ((parseInt(eventtimestamp[1])  * 60000));
    console.log(timeTimestamp,'total unix time of time');
    console.log(eventtimestamp[0],'hour');
    console.log(eventdate,'eventDate');
    console.log(a,'timestamp');
    let b = a+ timeTimestamp;
    console.log(b,'total mili time');
      this.eventItemRef$.push({
        eventname: this.eventItem.eventname,
        owner: this.eventItem.owner,
        time: this.eventItem.time,
        uid: this.eventItem.uid,
        map: this.latLong,
        posttime: this.time,
        detail: this.eventItem.detail,
        category: this.eventItem.category,
        avatar: this.eventItem.avatar,
        keyid: this.eventItem.keyid,
        date: eventdate,
        timestamp: b.toString()
      })
      this.eventItem = {} as EventItem;
      this.navCtrl.push('AddEventSuccessPage');
  }
  c: any;
  getDate(date){
  let list = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  // var list = new Array();
  // list[01] = "Jan";
  
  const dateSplit  = date.split("-");
  const month = dateSplit[1].split("0");
  console.log(dateSplit,'month');
  console.log(month,'month');
  if(month[0] == ''){
    this.c = month[1];
  }
  else{
    this.c  = month[0];
  }
  return  list[this.c -1] +","+ dateSplit[2];
  }

  getTimestamp(eventtime){
    const time =eventtime.split("-");
    const newtime =time[1]+","+time[2]+","+time[0];
    return new Date(newtime).getTime();​ //will alert 1330192800000
  }

  // CenterControl(controlDiv, map) {

  //   // Set CSS for the control border.
  //   var controlUI = document.createElement('div');
  //   controlUI.style.backgroundColor = '#fff';
  //   controlUI.style.border = '2px solid #fff';
  //   controlUI.style.borderRadius = '3px';
  //   controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  //   controlUI.style.cursor = 'pointer';
  //   controlUI.style.marginBottom = '10px';
  //   controlUI.style.textAlign = 'center';
  //   controlUI.title = 'Click to recenter the map';
  //   controlDiv.appendChild(controlUI);

  //   // Set CSS for the control interior.
  //   var controlText = document.createElement('div');
  //   controlText.style.color = 'rgb(25,25,25)';
  //   controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  //   controlText.style.fontSize = '16px';
  //   controlText.style.lineHeight = '38px';
  //   controlText.style.paddingLeft = '5px';
  //   controlText.style.paddingRight = '5px';
  //   controlText.innerHTML = 'Pin this location';
  //   controlUI.appendChild(controlText);

  //   // Setup the click event listeners: simply set the map to Chicago.
  //   controlUI.addEventListener('click', function() {
  //     // map.setCenter(chicago);
     
      
  //   });

  // }

}
