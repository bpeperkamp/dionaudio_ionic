import { Component } from '@angular/core';
import { NavController, Platform, ToastController, App, ViewController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppPreferences } from '@ionic-native/app-preferences';

import { MoviesPage } from '../movies-page/movies-page';
import { MoviePage } from '../movie-page/movie-page';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  ip: any;

  constructor(public navCtrl: NavController, public storage: Storage, public platform: Platform, public app: App, public viewCtrl: ViewController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public appPreferences: AppPreferences) {
    platform.ready().then(() => {
      this.storage.get('ip').then((val) => {
        this.ip = val;
      })
      //this.appPreferences.store('ip-number', '10.0.0.102');
      //this.appPreferences.fetch('ip-number').then((res) => { console.log(res); });
    });
  }

  ionViewWillEnter() {
    console.log('pre loaded');
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1000
    });
    loader.onDidDismiss(() => {
      console.log('Dismissed loading');
      this.presentToast();
      this.app.getRootNav().setRoot(TabsPage);
    });
    loader.present();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'IP number was saved successfully',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  storeIp(ipnumber: any) {
    this.storage.set('ip', ipnumber);
    this.storage.set('movie_data', false);
    this.storage.set('music_data', false);
    this.presentLoading();
  }

}
