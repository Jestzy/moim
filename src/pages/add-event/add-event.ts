import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,Loading, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;
/**
 * Generated class for the AddEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage implements OnInit {
  loader: Loading;

  ngOnInit(): void{
  
    // this.loader.present();
    
    //  this.geolocation.getCurrentPosition().then((resp) => {
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
    //   this.loader.dismiss();

    // }).catch((error) => {
    //   console.log('Error getting location', error);
    //   this.loader.dismiss();
    // });

  
          // this.loader.dismiss();
          // this.loadMap();   
      
  }

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers: any;
  position : any;
  lat: any;
  long : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private geolocation : Geolocation,private loading: LoadingController
    ) {
      this.loader = this.loading.create({
        content: 'Loading...'
      });
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
    //  this.tryLoad();

    // let latLng = new google.maps.LatLng(this.lat, this.long);
    // console.log(this.lat);
    // this.geolocation.getCurrentPosition().then((resp) => {
    //   let pos = {
    //     lat: resp.coords.latitude,
    //     lng: resp.coords.longitude
    //   };
    //   console.log(pos);
    // this.lat = pos.lat;
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
    
    this.position = this.navParams.get('f');
    console.log('hi');
    // console.log(this.position.lat);
    // let latLng = new google.maps.LatLng(this.position.lat, this.position.long);
    // console.log(latLng); 
    let mapOptions = {
      center:  this.position,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      streetViewControl: false,
      mapTypeControl: false,
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    }
    console.log(mapOptions);
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.map.setCenter(this.position);
    // let mylat = this.map.getCameraPosition().target.latitude;               
  //  let m = this.map.getCameraPosition().ta
    // let mylong = this.map.getCameraPosition().target.longitude;
  //  console.log(mylat);
  //  console.log(mylong);
    var marker = new google.maps.Marker({position: this.position, map: this.map});
    marker.bindTo('position', this.map, 'center');
    // var center = marker.getCameraPosition();
    console.log(marker);
   google.maps.event.addListener(this.map, 'center_changed' , () => {
    var  a = this.map.getCenter().lat();
    var b = this.map.getCenter().lng();
    // var b =this.map.getCameraPosition();
  //   console.log(marker);

   console.log(a,b);
   });
  }
  do(){
    this.map.setCenter(this.position);
  }
  // tryGeolocation(){
  //   this.clearMarkers();
  //   this.geo.getCurrentPosition().then((resp) => {
  //     let pos = {
  //       lat: resp.coords.latitude,
  //       lng: resp.coords.longitude
  //     };
  //     let marker = new google.maps.Marker({
  //       position: pos,
  //       map: this.map,
  //       title: 'I am here!'
  //     });
  //     this.markers.push(marker);
  //     this.map.setCenter(pos);
  //   }).catch((error) => {
  //     console.log('Error getting location', error);
  //   });
  // }

  clearMarkers(){
    for (var i = 0; i < this.markers.length; i++) {
      console.log(this.markers[i])
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

}
