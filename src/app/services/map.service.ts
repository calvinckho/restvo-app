import { Injectable, ViewChild, Directive } from '@angular/core';
import {IonInfiniteScroll, ModalController, Platform} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {Geolocation} from "@ionic-native/geolocation/ngx";
import {Moment} from "./moment.service";
import {Router} from "@angular/router";
import {ShowrecipientinfoPage} from "../pages/connect/showrecipientinfo/showrecipientinfo.page";
import {UserData} from "./user.service";

declare var mapboxgl: any;
declare var unwired: any;

@Directive()
@Injectable({
  providedIn: 'root'
})
export class MapService {

  mapURL = {};
  addressURL = {};
  loadCompleted = false;
  totalVoteCount: any = {};

  // map
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  userLocation = {
    lat: 37.7988255,
    lng: -122.1832307
  };
  userZoom = 10;
  searchKeyword = '';
  searchRadius = 10;
  pageNum = 0;
  reachedEnd = true;
  map: any;
  mapData: any;
  markers = [];
  mapReady = false;
  geolocationReady = false;
  showFilter = false;
  resultListHeight = 100;
  autoZoomState = 'in';
  filterSelections = [true, false, true, true, true];
  ionSpinner = false;
  loadAPIBusy = false;

  constructor(
      private router: Router,
      public platform: Platform,
      private storage: Storage,
      private geolocation: Geolocation,
      private userData: UserData
  ) {}

  // Map
  async setupMap() {
    console.log('setting up');
    this.loadStoredLocation();
    this.loadMap();
    const pos = await this.storage.get('userLocation');
    if (pos) {
      this.userLocation = pos;
    }
    const zoom = await this.storage.get('userZoom');
    if (zoom) {
      this.userZoom = zoom;
    }
  }

  async loadStoredLocation() {
    try {
      const pos = await this.storage.get('userLocation');
      if (pos) {
        console.log("Geolocation Latitude is: " + pos.lat + "Longitude is: " + pos.lng);
        this.userLocation = pos;
      } else {
        this.userLocation = {
          lat: 37.7988255,
          lng: -122.1832307
        };
      }
      this.geolocationReady = true;
    } catch (err) {
      console.log('Error getting location', err);
      this.userLocation = {
        lat: 37.7988255,
        lng: -122.1832307
      };
      this.geolocationReady = true;
    }
    this.initializeMapCenter();
  }

  async getCurrentLocation(event) {
    event.stopPropagation();
    try {
      const position = await this.geolocation.getCurrentPosition();
      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log("Geolocation Latitude is: " + pos.lat + "Longitude is: " + pos.lng);
      //this.updateMap(yourPosition);
      this.userLocation = pos;
      this.storage.set('userLocation', this.userLocation);
      this.geolocationReady = true;
    } catch (err) {
      console.log('Error getting location', err);
    }
    this.initializeMapCenter();
  }

  initializeMapCenter() {
    if (this.mapReady && this.geolocationReady) {
      this.map.setCenter(this.userLocation);
      this.userData.refreshUserStatus({ type: 'search map' });
    }
  }

  async loadMap() {
    //Add your Unwired Maps Access Token here (not the API token!)
    unwired.key = mapboxgl.accessToken = 'pk.e5797fe100f9aa5732d5346f742b243f';
    //Define the map and configure the map's theme
    this.map = new mapboxgl.Map({
      container: 'mapCanvas',
      attributionControl: false, //need this to show a compact attribution icon (i) instead of the whole text
      style: unwired.getLayer("streets"), //get Unwired's style template
      zoom: this.userZoom,
      center: [this.userLocation.lng, this.userLocation.lat]
    });

    this.map.on('load', () => {
      setTimeout(()=> {
        this.map.resize();
      }, 500);
      this.mapReady = true;
      this.initializeMapCenter();
    });

    this.map.on('click', () => {
      this.autoZoomMap(true);
    });

    this.map.on('dblclick', () => {
      this.map.easeTo({
        center: [this.userLocation.lng, this.userLocation.lat],
        zoom: this.userZoom++
      });
    });

    this.map.on('dragend', () => {
      this.userLocation = {
        lat: this.map.getCenter().lat,
        lng: this.map.getCenter().lng
      };
      this.storage.set('userLocation', this.userLocation);
    });

    this.map.on('zoomend', () => {
      this.userZoom = this.map.getZoom();
      this.storage.set('userZoom', this.map.getZoom());
    });
  }

  renderMarkers() {
    if (this.mapData && this.mapData.length) {
      for (let i = this.mapData.length - 1; i > -1; i--) {
        // only plot Groups, Communities that have 'Point' type geoJSON data, ignore People that have 'MultiPoint' geoJSON type
        if (this.mapData[i].location.geo && !Array.isArray(this.mapData[i].location.geo.coordinates[0]) && !Array.isArray(this.mapData[i].location.geo.coordinates[1])) {
          this.userLocation.lng = this.mapData[i].location.geo.coordinates[0]; // mark the first search result's coordinate as the new center
          this.userLocation.lat = this.mapData[i].location.geo.coordinates[1]; // mark the first search result's coordinate as the new center
          const markerData = this.mapData[i];
          let el = document.createElement('div');
          el.className = 'marker';
          el.innerHTML = '<div><p>' + (i+1).toString() + '</p></div>';
          el.style.width = '30px';
          el.style.height = '30px';

          //Instead of this click listener, we can attach a popup / infowindow to this marker (see next section)
          el.addEventListener('click', () => {
            this.clickList(markerData);
          });

          // add marker to map
          const marker = new mapboxgl.Marker(el)
              .setLngLat([markerData.location.geo.coordinates[0] + this.randCoordinates(markerData, 'lng'), markerData.location.geo.coordinates[1] + this.randCoordinates(markerData, 'lat')])
              .addTo(this.map);
          this.markers.push(marker);
        }
      }
    }
    this.autoZoomMap(false);
  }

  autoZoomMap(zoomIn) {
    console.log("zooming");
    this.showFilter = false;
    let factor = 0;
    if (zoomIn) { // zomming in
      if (this.autoZoomState === 'out') {
        //this.userZoom++;
        this.autoZoomState = 'in';
        factor = 45 * Math.cos(this.userLocation.lat * Math.PI / 180) / Math.pow(2, this.userZoom);
        console.log("autoZoom", this.autoZoomState, factor, this.userLocation);
      }
    } else { // zoming out
      if (this.autoZoomState === 'in') {
        //this.userZoom--;
        this.autoZoomState = 'out';
        factor = 90 * Math.cos(this.userLocation.lat * Math.PI / 180) / Math.pow(2, this.userZoom);
        console.log("autoZoom", this.autoZoomState, factor, this.userLocation);
      }
    }
    this.map.easeTo({
      center: [this.userLocation.lng, this.userLocation.lat],
      zoom: this.userZoom
    });
  }

  clickList(data) {
    console.log("data", data);
    if (data.user) {
      data._id = data.user;
      if (data.images && data.images.length) {
        data.avatar = data.images[0];
      }
      this.userData.refreshUserStatus({ type: 'show recipient', data: data });
    } else if (data.moment) {
      this.router.navigateByUrl('/app/home/activity/' + data.moment._id);
    } else if (data.church) {
      this.router.navigateByUrl('/connect/' + data.church);
    }
  }

/*  async seeUserInfo(event, user) {
    if (event) event.stopPropagation();
    user.name = user.first_name + ' ' + user.last_name;
    const recipientModal = await this.modalCtrl.create({component: ShowrecipientinfoPage, componentProps: {recipient: user, modalPage: true}} );
    await recipientModal.present();
  }*/

  randCoordinates(entity: any, latLng: string) {
    if(entity.location.street) {
      return 0;
    }
    let sum_of_id = 0;
    for(let i = 0; i < entity._id.length; i++){
      sum_of_id += entity._id.charAt(i).charCodeAt(0); //sum up all the characters in the _id string
    }
    if (latLng === 'lat'){
      return Math.ceil(parseInt(sum_of_id.toString().charAt(1))/10 - 0.5) * parseFloat(sum_of_id.toString().charAt(sum_of_id.toString().length-1))/1000; //grab the last digit of the sum total
    } else {
      return Math.ceil(parseInt(sum_of_id.toString().charAt(1))/10 - 0.5) * parseFloat(sum_of_id.toString().charAt(sum_of_id.toString().length-2))/1000; //grab the second to the last digit of the sum total
    }
  }
}
