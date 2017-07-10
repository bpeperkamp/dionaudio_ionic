import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ArtistPage } from '../artist-page/artist-page';

import { Kodi } from '../../providers/kodi';
/**
 * Generated class for the MusicPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-music-page',
  templateUrl: 'music-page.html',
  providers: [ Kodi ],
})
export class MusicPage {

  public artists: any;
  public toggled: boolean;
  public kodiAdress: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public loadingCtrl: LoadingController, public storage: Storage, public Kodi: Kodi) {
    this.toggled = false;
    this.artists = [];

    this.platform.ready().then(() => {
      this.storage.get('ip').then((val) => {
        this.kodiAdress = val;
        this.Kodi.getArtists(this.kodiAdress).subscribe(
          data => {
            this.artists = data.result.artists;
          },
          err => {
            this.artists = null;
          },
          () => console.log('Got all artists')
        );
      })
    });

  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1000
    });
    loader.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
    loader.present();
  }

  ionViewWillEnter() {
    this.platform.ready().then(() => {
      this.storage.get('music_data').then((val) => {
        if(val === false) {
          this.presentLoading();
          this.artists = [];
          this.storage.set('music_data', true);
          // Get new data from provider
          this.storage.get('ip').then((val) => {
            this.kodiAdress = val;
            this.Kodi.getArtists(this.kodiAdress).subscribe(
              data => {
                this.artists = data.result.artists;
                //data.result.artists.forEach(function(obj) {
                  //this.artists_array.push(obj);
                //});
              },
              err => {
                this.artists = null;
              },
              () => console.log('Got all artists renewed')
            );
          })
          // end Get new data from provider
        } else {
          //console.log('no new data get is neccesary');
        }
      })
    });
  }

  getItems(searchEvent: any) {
    let term = searchEvent.target.value
    if(searchEvent.target.value == null) {
      this.Kodi.getArtists(this.kodiAdress).subscribe(
        data => {
          this.artists = data.result.artists;
        },
        err => {
          this.artists = null;
        }
      );
    } else {
      if (term.trim() === '' || term.trim().length < 3) {
        this.Kodi.getArtists(this.kodiAdress).subscribe(
          data => {
            this.artists = data.result.artists;
          },
          err => {
            this.artists = null;
          }
        );
      } else {
        this.artists = this.artists.filter((item) => {
          return (item.label.toLowerCase().indexOf(term.toLowerCase()) > -1);
        })
      }
    }
  }

  public showInfo(id: number) {
    this.navCtrl.push(ArtistPage, {
      artist: id,
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MusicPage');
  }

}
