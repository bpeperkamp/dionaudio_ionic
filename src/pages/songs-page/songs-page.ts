import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Kodi } from '../../providers/kodi';

/**
 * Generated class for the SongsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-songs-page',
  templateUrl: 'songs-page.html',
})
export class SongsPage {

  public songs: any;
  public artist: any;
  public albums: any;
  public album: any;
  public bgImage:any;
  public kodiAdress: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public toastCtrl: ToastController, public storage: Storage, public Kodi: Kodi) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SongsPage');
  }

  ionViewWillEnter() {
    this.songs = [];
    this.artist = [];
    this.platform.ready().then(() => {
      this.storage.get('ip').then((val) => {
        this.kodiAdress = val;
        this.Kodi.getAlbumDetails(this.kodiAdress, this.navParams.get('album'))
        .subscribe(
          data => {
            //console.log(data);
            this.album = data.result.albumdetails;
          },
          err => {
              console.log(err);
          }
        );
        this.Kodi.getAlbumSongs(this.kodiAdress, this.navParams.get('album'))
        .subscribe(
          data => {
            //console.log(data);
            this.songs = data.result.songs;
          },
          err => {
              //console.log(err);
          }
        );
      })
    });
  }

  presentToast(message: any) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }

  public playSong(id: number, label: any) {
    this.Kodi.playSong(this.kodiAdress, id).subscribe(
      data => {
        this.presentToast('Playing: '+label+'');
        //console.log(data);
      },
      err => {
        //console.log(err);
      },
      //() => console.log('Playing the album')
    );
  }

}
